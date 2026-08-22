import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { TracksModule } from './tracks/tracks.module';
import { PlaylistsModule } from './playlists/playlists.module';
import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DatabaseModule,

    AuthModule,
    TracksModule,
    PlaylistsModule,
    UsersModule,
    GenresModule
  ],
})
export class AppModule {}