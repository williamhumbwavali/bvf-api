import {
    Controller,
    Get,
    Param,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { ArtistsService } from './artists.service';
import { Artist } from 'src/database/entities/artist.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Artists')
@Controller('artists')
export class ArtistsController {
    constructor(
        private readonly artistsService: ArtistsService,
    ) { }

    @Get()
    @ApiOperation({
        summary: 'Listar artistas',
        description: 'Retorna uma lista de artistas disponíveis na plataforma.',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        example: 20,
        description: 'Número máximo de artistas a retornar.',
    })
    @ApiResponse({
        status: 200,
        description: 'Lista de artistas retornada com sucesso.',
        type: [Artist],
    })
    async findAll(
        @Query('limit') limit?: number,
    ): Promise<Artist[]> {
        return this.artistsService.findAll(limit);
    }

    @Get('me')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('access-token')
    @ApiOperation({
        summary: 'Obter meu perfil de artista',
        description:
            'Retorna o artista associado ao usuário autenticado, incluindo suas músicas.',
    })
    @ApiResponse({
        status: 200,
        description: 'Perfil do artista encontrado.',
    })
    @ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
    })
    @ApiResponse({
        status: 404,
        description:
            'Nenhum artista associado ao usuário autenticado.',
    })
    async findMe(@Req() req: any) {
        return this.artistsService.findByUserId(req.user.sub);
    }

    @Get('username/:username')
    @ApiOperation({
        summary: 'Buscar artista por username',
        description:
            'Retorna o perfil do artista associado ao username, incluindo suas músicas.',
    })
    @ApiParam({
        name: 'username',
        description: 'Username do usuário',
        example: 'william',
    })
    @ApiResponse({
        status: 200,
        description: 'Artista encontrado com sucesso.',
    })
    @ApiResponse({
        status: 404,
        description: 'Artista não encontrado para este username.',
    })
    async findByUsername(
        @Param('username') username: string,
    ) {
        return this.artistsService.findByUsername(username);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Buscar artista por ID',
        description: 'Retorna os dados de um artista específico.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do artista',
        example: 'a7f8c9d1-1234-4567-8901-abcdef123456',
    })
    @ApiResponse({
        status: 200,
        description: 'Artista encontrado com sucesso.',
        type: Artist,
    })
    @ApiResponse({
        status: 404,
        description: 'Artista não encontrado.',
    })
    async findOne(
        @Param('id') id: string,
    ): Promise<Artist> {
        return this.artistsService.findOne(id);
    }

    
}