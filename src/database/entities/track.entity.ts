import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Album } from './albums.entity';
import { Genre } from './genre.entity';
import { Like } from './like.entity';

@Entity('tracks')
@Index(['title'])
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @ManyToOne(() => Genre, (genre) => genre.tracks, {
    nullable: false,
  })
  @JoinColumn({ name: 'genreId' })
  genre: Genre

  @Column()
  genreId: string

  @Column({ default: 0 })
  durationSec: number;

  @Column({ default: 0 })
  playCount: number;

  @Column({ default: 0 })
  downloadCount: number;

  @Column({ nullable: true })
  accent: string;

  @Column({ nullable: true })
  audioUrl: string;

  @Column({ nullable: true })
  coverUrl: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'CASCADE',
  })
  artist: Artist;

  @Column()
  artistId: string;

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: Album;

  @Column({ nullable: true })
  albumId: string;

  @OneToMany(() => Like, (like) => like.track)
  likes: Like[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}