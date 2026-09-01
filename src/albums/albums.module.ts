import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Album } from 'src/database/entities/albums.entity';
import { Artist } from 'src/database/entities/artist.entity';
import { Track } from 'src/database/entities/track.entity';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';

@Module({ imports: [TypeOrmModule.forFeature([Album, Artist, Track]), AuthModule], controllers: [AlbumsController], providers: [AlbumsService] })
export class AlbumsModule {}
