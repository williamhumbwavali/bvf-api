import {
    Controller,
    Get,
    Param,
    NotFoundException,
} from '@nestjs/common'

import { GenresService } from './genres.service'

@Controller('genres')
export class GenresController {
    constructor(
        private readonly genresService: GenresService,
    ) { }

    @Get()
    findAll() {
        return this.genresService.findAll()
    }

    @Get('slug/:slug')
    async findBySlug(
        @Param('slug') slug: string,
    ) {
        const genre =
            await this.genresService.findBySlug(slug)

        if (!genre) {
            throw new NotFoundException(
                'Genre not found',
            )
        }

        return genre
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const genre = await this.genresService.findOne(id)

        if (!genre) {
            throw new NotFoundException(
                'Genre not found',
            )
        }

        return genre
    }
}