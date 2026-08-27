import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.decorators';

import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateAccountDto } from './dto/update-account.dto';

@ApiTags('Users')
@Controller('users/me')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

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

  @Patch('me')
  updateAccount(
    @Req() req: any,
    @Body() dto: UpdateAccountDto,
  ) {
    return this.usersService.updateAccount(
      req.sub,
      dto,
    )
  }
}