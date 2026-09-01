import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from 'src/database/entities/albums.entity';
import { Artist } from 'src/database/entities/artist.entity';
import { Track } from 'src/database/entities/track.entity';
import { In, Repository } from 'typeorm';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumTracksDto } from './dto/album-tracks.dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album) private readonly albums: Repository<Album>,
    @InjectRepository(Artist) private readonly artists: Repository<Artist>,
    @InjectRepository(Track) private readonly tracks: Repository<Track>,
  ) {}

  async list() { return this.albums.find({ relations: ['artist', 'tracks'], order: { createdAt: 'DESC' } }); }

  async get(id: string) {
    const album = await this.albums.findOne({ where: { id }, relations: ['artist', 'tracks'] });
    if (!album) throw new NotFoundException('Album not found');
    return album;
  }

  async create(dto: CreateAlbumDto, userId: string) {
    const artist = await this.artistForUser(userId);
    const { trackIds = [], ...data } = dto;
    return this.albums.manager.transaction(async (manager) => {
      const tracks = await this.ownedTracks(trackIds, artist.id, manager.getRepository(Track));
      const album = manager.getRepository(Album).create({ ...data, artistId: artist.id });
      const saved = await manager.getRepository(Album).save(album);
      if (tracks.length) await manager.getRepository(Track).update({ id: In(trackIds) }, { albumId: saved.id });
      return manager.getRepository(Album).findOneOrFail({ where: { id: saved.id }, relations: ['artist', 'tracks'] });
    });
  }

  async addTracks(id: string, dto: AlbumTracksDto, userId: string) {
    const artist = await this.artistForUser(userId);
    const album = await this.albums.findOneBy({ id, artistId: artist.id });
    if (!album) throw new NotFoundException('Album not found');
    await this.albums.manager.transaction(async (manager) => {
      await this.ownedTracks(dto.trackIds, artist.id, manager.getRepository(Track));
      await manager.getRepository(Track).update({ id: In(dto.trackIds) }, { albumId: album.id });
    });
    return this.get(id);
  }

  async removeTrack(id: string, trackId: string, userId: string) {
    const artist = await this.artistForUser(userId);
    const result = await this.tracks.update({ id: trackId, albumId: id, artistId: artist.id }, { albumId: null });
    if (!result.affected) throw new NotFoundException('Track not found in this album');
    return { removed: true };
  }

  private async artistForUser(userId: string) {
    const artist = await this.artists.findOneBy({ userId });
    if (!artist) throw new NotFoundException('Artist profile not found');
    return artist;
  }

  private async ownedTracks(ids: string[], artistId: string, repository = this.tracks) {
    if (!ids.length) return [];
    const tracks = await repository.findBy({ id: In(ids), artistId });
    if (tracks.length !== ids.length) throw new NotFoundException('One or more tracks were not found');
    return tracks;
  }
}
