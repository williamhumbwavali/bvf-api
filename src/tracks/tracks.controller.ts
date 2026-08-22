import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/auth.decorators";

import { TracksService } from './tracks.service';

import { TrackDto } from './dto/create-track.dto';
import { StorageService } from 'src/storage/storage.service';

@Controller('tracks')
export class TracksController {
    constructor(
        private readonly tracksService: TracksService,
        private readonly storageService: StorageService
    ) { }

    @Get()
    list(
        @Query('page') page = 1,
        @Query('limit') limit = 20,
        @Query('search') search?: string,
    ) {
        return this.tracksService.list(
            +page,
            +limit,
            search,
        );
    }

    @Get(':id')
    get(@Param('id') id: string) {
        return this.tracksService.get(id);
    }

    @Post('upload-url')
    @UseGuards(AuthGuard)
    async createUploadUrl(
        @Body()
        body: {
            type: 'audio' | 'cover'
            filename: string
            contentType: string
        },
    ) {
        const folder =
            body.type === 'audio'
                ? 'audio'
                : 'covers'

        return this.storageService.createUploadUrl(
            folder,
            body.filename,
            body.contentType,
        )
    }

    @Post()
    @UseGuards(AuthGuard)
    create(
        @Body() dto: TrackDto,
        @CurrentUser() user: any,
    ) {
        return this.tracksService.create(dto, user.sub);
    }

    @Patch(':id')
    @UseGuards(AuthGuard)
    update(
        @Param('id') id: string,
        @Body() dto: TrackDto,
        @CurrentUser() user: any,
    ) {
        return this.tracksService.update(
            id,
            dto,
            user.sub,
        );
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    remove(
        @Param('id') id: string,
        @CurrentUser() user: any,
    ) {
        return this.tracksService.remove(
            id,
            user.sub,
        );
    }

    @Post(':id/play')
    @UseGuards(AuthGuard)
    play(
        @Param('id') id: string,
        @CurrentUser() user: any,
    ) {
        return this.tracksService.play(
            id,
            user.sub,
        );
    }

    @Post(':id/like')
    @UseGuards(AuthGuard)
    like(
        @Param('id') id: string,
        @CurrentUser() user: any,
    ) {
        return this.tracksService.like(
            id,
            user.sub,
        );
    }

    @Delete(':id/like')
    @UseGuards(AuthGuard)
    unlike(
        @Param('id') id: string,
        @CurrentUser() user: any,
    ) {
        return this.tracksService.unlike(
            id,
            user.sub,
        );
    }

    @Get(':id/likes')
    likesCount(@Param('id') id: string) {
        return this.tracksService.likesCount(id);
    }
}