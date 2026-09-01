import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { DownloadHistory } from 'src/database/entities/download-history.entity';
import { ArtistFollower } from 'src/database/entities/artist-follower.entity';
import { Like } from 'src/database/entities/like.entity';
import { PlaybackHistory } from 'src/database/entities/playback-history.entity';
import { Artist } from 'src/database/entities/artist.entity';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Role, User } from 'src/database/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(PlaybackHistory)
    private readonly historyRepository: Repository<PlaybackHistory>,

    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,

    @InjectRepository(DownloadHistory)
    private readonly downloadsRepository: Repository<DownloadHistory>,

    @InjectRepository(ArtistFollower)
    private readonly followersRepository: Repository<ArtistFollower>,

    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }

  // =========================
  // HISTORY
  // =========================

  async getHistory(userId: string) {
    return this.historyRepository.find({
      where: {
        userId,
      },
      order: {
        playedAt: 'DESC',
      },
    });
  }

  async clearHistory(userId: string) {
    await this.historyRepository.delete({
      userId,
    });

    return {
      cleared: true,
    };
  }

  // =========================
  // LIKED TRACKS
  // =========================

  async getLikedTracks(userId: string) {
    return this.likesRepository.find({
      where: {
        userId,
      },
      relations: {
        track: {
          artist: true,
          genre: true,
          album: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // =========================
  // DOWNLOADS
  // =========================

  async getDownloads(userId: string) {
    return this.downloadsRepository.find({
      where: {
        userId,
      },
      order: {
        downloadedAt: 'DESC',
      },
    });
  }

  // =========================
  // FOLLOWING
  // =========================

  async getFollowing(userId: string) {
    return this.followersRepository.find({
      where: {
        userId,
      },
    });
  }

  async updateAccount(
    userId: string,
    dto: UpdateAccountDto,
  ) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    })

    if (!user) {
      throw new NotFoundException('Utilizador não encontrado')
    }

    // Verificar username antes de alterar
    if (dto.username && dto.username !== user.username) {
      const existingUser = await this.usersRepository.findOne({
        where: {
          username: dto.username,
        },
      })

      if (existingUser && existingUser.id !== userId) {
        throw new ConflictException(
          'Este username já está em uso',
        )
      }

      const existingArtist = await this.artistsRepository.findOne({
        where: {
          handle: dto.username,
        },
      })

      if (existingArtist && existingArtist.userId !== userId) {
        throw new ConflictException(
          'Este username já está em uso',
        )
      }
    }

    user.name = dto.name ?? user.name
    user.username = dto.username ?? user.username
    user.bio = dto.bio ?? user.bio
    user.genre = dto.genre ?? user.genre
    user.avatarUrl = dto.avatarUrl ?? user.avatarUrl

    await this.usersRepository.save(user)


    if (user.role === Role.ARTIST || user.role === Role.USER) {
      const artist = await this.artistsRepository.findOne({
        where: {
          userId: user.id,
        },
      })

      if (artist) {
        artist.name = user.name
        artist.handle = user.username
        artist.bio = user.bio
        artist.genre = user.genre
        artist.image = user.avatarUrl

        await this.artistsRepository.save(artist)
      }
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      genre: user.genre,
    }
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.passwordHash')
      .where('user.id = :userId', { userId })
      .getOne();

    if (!user) {
      throw new NotFoundException('Utilizador não encontrado');
    }

    const isCurrentPasswordValid = await bcrypt.compare(
      currentPassword,
      user.passwordHash,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('A senha atual está incorreta');
    }

    if (currentPassword === newPassword) {
      throw new ConflictException(
        'A nova senha deve ser diferente da senha atual',
      );
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);

    user.passwordHash = passwordHash;

    await this.usersRepository.save(user);

    return {
      message: 'Senha alterada com sucesso',
    };
  }
}