import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Playlist } from "src/database/entities/playlist.entity";
import { Track } from "src/database/entities/track.entity";

import { In, Repository } from 'typeorm';

import { PlaylistDto } from './dto/create-playlist.dto';
import { PlaylistTracksDto } from './dto/playlist-tracks.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Playlist)
    private readonly playlistsRepository: Repository<Playlist>,

    @InjectRepository(Track)
    private readonly tracksRepository: Repository<Track>,
  ) {}

  /* =========================
     LIST USER PLAYLISTS
  ========================= */

  async list(userId: string) {
    return this.playlistsRepository.find({
      where: {
        ownerId: userId,
      },

      relations: [
        'tracks',
      ],

      order: {
        createdAt: 'DESC',
      },
    });
  }

  /* =========================
     CREATE PLAYLIST
  ========================= */

  async create(
    dto: PlaylistDto,
    userId: string,
  ) {
    const playlist =
      this.playlistsRepository.create({
        ...dto,

        ownerId: userId,
      });

    return this.playlistsRepository.save(
      playlist,
    );
  }

  /* =========================
     GET PLAYLIST
  ========================= */

  async get(id: string) {
    const playlist =
      await this.playlistsRepository.findOne({
        where: {
          id,
        },

        relations: [
          'tracks',
        ],
      });

    if (!playlist) {
      throw new NotFoundException(
        'Playlist not found',
      );
    }

    return playlist;
  }

  /* =========================
     UPDATE PLAYLIST
  ========================= */

  async update(
    id: string,
    dto: PlaylistDto,
    userId: string,
  ) {
    const playlist =
      await this.playlistsRepository.findOne({
        where: {
          id,
          ownerId: userId,
        },
      });

    if (!playlist) {
      throw new NotFoundException(
        'Playlist not found',
      );
    }

    Object.assign(
      playlist,
      dto,
    );

    return this.playlistsRepository.save(
      playlist,
    );
  }

  /* =========================
     DELETE PLAYLIST
  ========================= */

  async remove(
    id: string,
    userId: string,
  ) {
    const result =
      await this.playlistsRepository.delete({
        id,
        ownerId: userId,
      });

    if (result.affected === 0) {
      throw new NotFoundException(
        'Playlist not found',
      );
    }

    return {
      deleted: true,
    };
  }

  async addTracks(id: string, dto: PlaylistTracksDto, userId: string) {
    const playlist = await this.playlistsRepository.findOne({
      where: { id, ownerId: userId },
      relations: ['tracks'],
    });
    if (!playlist) throw new NotFoundException('Playlist not found');

    const tracks = await this.tracksRepository.findBy({ id: In(dto.trackIds) });
    if (tracks.length !== dto.trackIds.length) {
      throw new NotFoundException('One or more tracks were not found');
    }

    const existingIds = new Set(playlist.tracks.map((track) => track.id));
    playlist.tracks.push(...tracks.filter((track) => !existingIds.has(track.id)));
    await this.playlistsRepository.save(playlist);
    return this.get(id);
  }

  async removeTrack(id: string, trackId: string, userId: string) {
    const playlist = await this.playlistsRepository.findOne({
      where: { id, ownerId: userId },
      relations: ['tracks'],
    });
    if (!playlist) throw new NotFoundException('Playlist not found');

    if (!playlist.tracks.some((track) => track.id === trackId)) {
      throw new NotFoundException('Track not found in this playlist');
    }

    playlist.tracks = playlist.tracks.filter((track) => track.id !== trackId);
    await this.playlistsRepository.save(playlist);
    return { removed: true };
  }
}
