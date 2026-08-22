import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthGuard } from "src/auth/auth.guard";
import { CurrentUser } from "src/auth/auth.decorators";
import { Playlist } from "src/database/entities/playlist.entity";
import { Track } from "src/database/entities/track.entity";
import { Repository } from "typeorm";
import { PlaylistDto } from "./dto/create-playlist.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Playlists')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('playlists')
export class PlaylistsController {
  constructor(
    @InjectRepository(Playlist)
    private readonly r: Repository<Playlist>,

    @InjectRepository(Track)
    private readonly tracks: Repository<Track>,
  ) {}

  @Get()
  list(@CurrentUser() user: any) {
    return this.r.find({
      where: {
        ownerId: user.sub,
      },
      relations: ['tracks'],
    });
  }

  @Post()
  create(
    @Body() dto: PlaylistDto,
    @CurrentUser() user: any,
  ) {
    return this.r.save(
      this.r.create({
        ...dto,
        ownerId: user.sub,
      }),
    );
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.r.findOne({
      where: {
        id,
      },
      relations: ['tracks'],
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: PlaylistDto,
    @CurrentUser() user: any,
  ) {
    const playlist = await this.r.findOneBy({
      id,
      ownerId: user.sub,
    });

    if (!playlist) {
      throw new NotFoundException();
    }

    return this.r.save({
      ...playlist,
      ...dto,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @CurrentUser() user: any,
  ) {
    await this.r.delete({
      id,
      ownerId: user.sub,
    });

    return {
      deleted: true,
    };
  }
}