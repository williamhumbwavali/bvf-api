import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { DownloadHistory } from 'src/database/entities/download-history.entity';
import { ArtistFollower } from 'src/database/entities/artist-follower.entity';
import { Like } from 'src/database/entities/like.entity';
import { PlaybackHistory } from 'src/database/entities/playback-history.entity';

import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Artist } from 'src/database/entities/artist.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlaybackHistory,
      Like,
      DownloadHistory,
      ArtistFollower,
      Artist,
      User
    ]),

    AuthModule,
  ],

  controllers: [
    UsersController,
  ],

  providers: [
    UsersService,
  ],

  exports: [
    UsersService,
  ],
})
export class UsersModule {}