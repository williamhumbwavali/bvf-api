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
import { User } from './user.entity';
import { Track } from './track.entity';

@Entity('artists')
@Unique(['handle'])
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  handle: string;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  verified: boolean;

  @Column({ default: 0 })
  followers: number;

  @Column({
    nullable: true,
    type: 'text',
  })
  bio: string;

  @ManyToOne(() => User, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column()
  userId: string;

  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}