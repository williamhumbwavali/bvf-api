import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Track } from 'src/database/entities/track.entity';
import { Artist } from 'src/database/entities/artist.entity';
import { Like } from 'src/database/entities/like.entity';
import { PlaybackHistory } from 'src/database/entities/playback-history.entity';

import {
  ILike,
  Repository,
} from 'typeorm';

import { TrackDto } from './dto/create-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,

    @InjectRepository(Like)
    private readonly likesRepository: Repository<Like>,

    @InjectRepository(PlaybackHistory)
    private readonly historyRepository: Repository<PlaybackHistory>,

    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
  ) { }

  /* =========================
     LIST TRACKS
  ========================= */

  async list(
    page: number,
    limit: number,
    search?: string,
  ) {
    const pageNumber = Math.max(1, page);
    const limitNumber = Math.min(
      Math.max(1, limit),
      100,
    );

    const [data, total] =
      await this.tracksRepository.findAndCount({
        where: search
          ? {
            title: ILike(`%${search}%`),
          }
          : {},

        relations: [
          'artist',
          'album',
        ],

        skip:
          (pageNumber - 1) *
          limitNumber,

        take: limitNumber,

        order: {
          createdAt: 'DESC',
        },
      });

    return {
      data,

      meta: {
        page: pageNumber,
        limit: limitNumber,
        total,
        totalPages: Math.ceil(
          total / limitNumber,
        ),
      },
    };
  }

  /* =========================
     GET TRACK
  ========================= */

  async get(id: string) {
    const track =
      await this.tracksRepository.findOne({
        where: {
          id,
        },

        relations: [
          'artist',
          'album',
        ],
      });

    if (!track) {
      throw new NotFoundException(
        'Track not found',
      );
    }

    return track;
  }

  /* =========================
     CREATE TRACK
  ========================= */

  async create(
    dto: TrackDto,
    userId: string,
  ) {
    const artist =
      await this.artistsRepository.findOne({
        where: {
          userId,
        },
      })

    if (!artist) {
      throw new NotFoundException(
        'Artist profile not found',
      )
    }

    const track =
      this.tracksRepository.create({
        ...dto,
        artistId: artist.id,
      })

    return this.tracksRepository.save(track)
  }

  /* =========================
     UPDATE TRACK
  ========================= */

  async update(
    id: string,
    dto: TrackDto,
    userId: string,
  ) {
    const track =
      await this.tracksRepository.findOne({
        where: {
          id,
        },
      });

    if (!track) {
      throw new NotFoundException(
        'Track not found',
      );
    }

    const artist =
      await this.artistsRepository.findOne({
        where: {
          userId,
        },
      });

    if (
      !artist ||
      track.artistId !== artist.id
    ) {
      throw new NotFoundException(
        'Track not found',
      );
    }

    /*
     * Não permitimos que o usuário
     * altere o artistId através do DTO.
     */

    const {
      artistId,
      ...data
    } = dto;

    Object.assign(
      track,
      data,
    );

    return this.tracksRepository.save(track);
  }

  /* =========================
     DELETE TRACK
  ========================= */

  async remove(
    id: string,
    userId: string,
  ) {
    const track =
      await this.tracksRepository.findOne({
        where: {
          id,
        },
      });

    if (!track) {
      throw new NotFoundException(
        'Track not found',
      );
    }

    const artist =
      await this.artistsRepository.findOne({
        where: {
          userId,
        },
      });

    if (
      !artist ||
      track.artistId !== artist.id
    ) {
      throw new NotFoundException(
        'Track not found',
      );
    }

    await this.tracksRepository.delete(id);

    return {
      deleted: true,
    };
  }

  /* =========================
     PLAY TRACK
  ========================= */

  async play(
    id: string,
    userId: string,
  ) {
    const track =
      await this.tracksRepository.findOne({
        where: {
          id,
        },
      });

    if (!track) {
      throw new NotFoundException(
        'Track not found',
      );
    }

    await this.tracksRepository.increment(
      {
        id,
      },
      'playCount',
      1,
    );

    const history =
      this.historyRepository.create({
        trackId: id,
        userId,
      });

    return this.historyRepository.save(
      history,
    );
  }

  /* =========================
     LIKE TRACK
  ========================= */

  async like(
    id: string,
    userId: string,
  ) {
    const track =
      await this.tracksRepository.findOne({
        where: {
          id,
        },
      });

    if (!track) {
      throw new NotFoundException(
        'Track not found',
      );
    }

    const existingLike =
      await this.likesRepository.findOne({
        where: {
          trackId: id,
          userId,
        },
      });

    if (existingLike) {
      return {
        liked: true,
      };
    }

    const like =
      this.likesRepository.create({
        trackId: id,
        userId,
      });

    await this.likesRepository.save(
      like,
    );

    return {
      liked: true,
    };
  }

  /* =========================
     UNLIKE TRACK
  ========================= */

  async unlike(
    id: string,
    userId: string,
  ) {
    await this.likesRepository.delete({
      trackId: id,
      userId,
    });

    return {
      liked: false,
    };
  }

  /* =========================
     LIKES COUNT
  ========================= */

  async likesCount(id: string) {
    const count =
      await this.likesRepository.count({
        where: {
          trackId: id,
        },
      });

    return {
      count,
    };
  }
}