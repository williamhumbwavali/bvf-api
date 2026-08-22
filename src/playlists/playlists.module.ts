import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Playlist } from "src/database/entities/playlist.entity";
import { Track } from "src/database/entities/track.entity";

import { AuthModule } from '../auth/auth.module';

import { PlaylistsController } from './playlists.controller';

import { PlaylistsService } from './playlists.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Playlist,
      Track,
    ]),

    AuthModule,
  ],

  controllers: [
    PlaylistsController,
  ],

  providers: [
    PlaylistsService,
  ],

  exports: [
    PlaylistsService,
  ],
})
export class PlaylistsModule {}