import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Track } from './track.entity';
import { Playlist } from './playlist.entity';

export enum Role {
  USER = 'USER',
  ARTIST = 'ARTIST',
  ADMIN = 'ADMIN',
}

@Entity('users')
@Unique(['email'])
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ select: false })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  bio: string;

  @Column({ nullable: true })
  genre: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];

  @OneToMany(() => Playlist, (playlist) => playlist.owner)
  playlists: Playlist[];
}