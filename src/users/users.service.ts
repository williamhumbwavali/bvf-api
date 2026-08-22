import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DownloadHistory } from 'src/database/entities/download-history.entity';
import { ArtistFollower } from 'src/database/entities/artist-follower.entity';
import { Like } from 'src/database/entities/like.entity';
import { PlaybackHistory } from 'src/database/entities/playback-history.entity';

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
  ) {}

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
}