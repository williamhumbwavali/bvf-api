import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/auth.decorators";
import { PlaylistDto } from "./dto/create-playlist.dto";
import { PlaylistTracksDto } from './dto/playlist-tracks.dto';
import { PlaylistsService } from './playlists.service';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Playlists')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlists: PlaylistsService) {}

  @Get()
  list(@CurrentUser() user: any) {
    return this.playlists.list(user.sub);
  }

  @Post()
  create(
    @Body() dto: PlaylistDto,
    @CurrentUser() user: any,
  ) {
    return this.playlists.create(dto, user.sub);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.playlists.get(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: PlaylistDto,
    @CurrentUser() user: any,
  ) {
    return this.playlists.update(id, dto, user.sub);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    return this.playlists.remove(id, user.sub);
  }

  @Post(':id/tracks')
  addTracks(
    @Param('id') id: string,
    @Body() dto: PlaylistTracksDto,
    @CurrentUser() user: any,
  ) {
    return this.playlists.addTracks(id, dto, user.sub);
  }

  @Delete(':id/tracks/:trackId')
  removeTrack(
    @Param('id') id: string,
    @Param('trackId') trackId: string,
    @CurrentUser() user: any,
  ) {
    return this.playlists.removeTrack(id, trackId, user.sub);
  }
}
