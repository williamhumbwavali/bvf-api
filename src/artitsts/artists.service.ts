import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Artist } from 'src/database/entities/artist.entity';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) {}

  async findAll(limit = 20): Promise<Artist[]> {
    const safeLimit = Math.min(Math.max(limit, 1), 100);

    return this.artistsRepository.find({
      relations: {
        tracks: {
          genre: true,
          album: true,
        },
      },
      order: {
        name: 'ASC',
      },
      take: safeLimit,
    });
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: { id },
      relations: {
        user: true,
        tracks: {
          genre: true,
          album: true,
        },
      },
    });

    if (!artist) {
      throw new NotFoundException('Artista não encontrado');
    }

    return artist;
  }

  async findByUserId(userId: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: {
        userId,
      },
      relations: {
        user: true,
        tracks: {
          genre: true,
          album: true,
          artist: true
        },
      },
    });

    if (!artist) {
      throw new NotFoundException(
        'Artista não encontrado para este usuário',
      );
    }

    return artist;
  }

  async findByUsername(username: string): Promise<Artist> {
    const artist = await this.artistsRepository.findOne({
      where: {
        user: {
          username,
        },
      },
      relations: {
        user: true,
        tracks: {
          genre: true,
          album: true,
          artist: true
        },
      },
    });

    if (!artist) {
      throw new NotFoundException(
        'Artista não encontrado para este username',
      );
    }

    return artist;
  }
}