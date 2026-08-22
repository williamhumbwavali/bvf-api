import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Track } from 'src/database/entities/track.entity';
import { Artist } from 'src/database/entities/artist.entity';
import { Like } from 'src/database/entities/like.entity';
import { PlaybackHistory } from 'src/database/entities/playback-history.entity';

import { AuthModule } from '../auth/auth.module';

import { TracksController } from './tracks.controller';

import { TracksService } from './tracks.service';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Track,
      Artist,
      Like,
      PlaybackHistory,
    ]),

    AuthModule,
    StorageModule,
  ],

  controllers: [
    TracksController,
  ],

  providers: [
    TracksService,
  ],

  exports: [
    TracksService,
  ],
})
export class TracksModule {}