import {
  Controller,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.decorators';

import { UsersService } from './users.service';

@Controller('users/me')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('history')
  history(
    @CurrentUser() user: any,
  ) {
    return this.usersService.getHistory(
      user.sub,
    );
  }

  @Delete('history')
  clearHistory(
    @CurrentUser() user: any,
  ) {
    return this.usersService.clearHistory(
      user.sub,
    );
  }

  @Get('liked-tracks')
  likedTracks(
    @CurrentUser() user: any,
  ) {
    return this.usersService.getLikedTracks(
      user.sub,
    );
  }

  @Get('downloads')
  downloads(
    @CurrentUser() user: any,
  ) {
    return this.usersService.getDownloads(
      user.sub,
    );
  }

  @Get('following')
  following(
    @CurrentUser() user: any,
  ) {
    return this.usersService.getFollowing(
      user.sub,
    );
  }
}