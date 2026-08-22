import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Genre } from 'src/database/entities/genre.entity'

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
  ) {}

  async findAll() {
    return this.genresRepository.find({
      order: {
        name: 'ASC',
      },
    })
  }

  async findOne(id: string) {
    return this.genresRepository.findOne({
      where: { id },
    })
  }

  async findBySlug(slug: string) {
    return this.genresRepository.findOne({
      where: { slug },
    })
  }
}