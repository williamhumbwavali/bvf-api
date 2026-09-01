import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.decorators';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumTracksDto } from './dto/album-tracks.dto';

@ApiTags('Albums')
@Controller('albums')
export class AlbumsController {
  constructor(private readonly albums: AlbumsService) {}
  @Get() list() { return this.albums.list(); }
  @Get(':id') get(@Param('id') id: string) { return this.albums.get(id); }
  @Post() @UseGuards(AuthGuard) @ApiBearerAuth('access-token')
  create(@Body() dto: CreateAlbumDto, @CurrentUser() user: any) { return this.albums.create(dto, user.sub); }
  @Post(':id/tracks') @UseGuards(AuthGuard) @ApiBearerAuth('access-token')
  addTracks(@Param('id') id: string, @Body() dto: AlbumTracksDto, @CurrentUser() user: any) { return this.albums.addTracks(id, dto, user.sub); }
  @Delete(':id/tracks/:trackId') @UseGuards(AuthGuard) @ApiBearerAuth('access-token')
  removeTrack(@Param('id') id: string, @Param('trackId') trackId: string, @CurrentUser() user: any) { return this.albums.removeTrack(id, trackId, user.sub); }
}
