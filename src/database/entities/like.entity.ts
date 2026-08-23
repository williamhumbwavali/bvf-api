import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Track } from './track.entity';

@Entity('likes')
@Unique(['userId', 'trackId'])
export class Like {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  trackId: string;

  @ManyToOne(() => Track, (track) => track.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId' })
  track: Track;

  @CreateDateColumn()
  createdAt: Date;
}