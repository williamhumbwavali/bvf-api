import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Artist } from './artist.entity';
import { Track } from './track.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  year: number;

  @Column({ nullable: true })
  coverUrl: string;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    onDelete: 'CASCADE',
  })
  artist: Artist;

  @Column()
  artistId: string;

  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}