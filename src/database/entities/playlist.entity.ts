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
import { Track } from './track.entity';
import { User } from './user.entity';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    nullable: true,
    type: 'text',
  })
  description: string;

  @Column({ nullable: true })
  coverUrl: string;

  @ManyToOne(() => User, (user) => user.playlists, {
    onDelete: 'CASCADE',
  })
  owner: User;

  @Column()
  ownerId: string;

  @ManyToMany(() => Track)
  @JoinTable({
    name: 'playlist_tracks',
  })
  tracks: Track[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}