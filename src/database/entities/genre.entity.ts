import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Track } from './track.entity'

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  name: string

  @Column({ unique: true })
  slug: string

  @OneToMany(() => Track, (track) => track.genre)
  tracks: Track[]
}