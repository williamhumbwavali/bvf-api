import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/auth/auth.decorators';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Users')
@Controller('users/me')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('history')
  @ApiOperation({
    summary: 'Obter histórico de reprodução',
    description: 'Retorna o histórico de músicas reproduzidas pelo utilizador autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Histórico de reprodução retornado com sucesso.',
  })
  history(
    @CurrentUser() user: any,
  ) {
    return this.usersService.getHistory(user.sub);
  }

  @Delete('history')
  @ApiOperation({
    summary: 'Limpar histórico de reprodução',
    description: 'Remove todo o histórico de reprodução do utilizador autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Histórico limpo com sucesso.',
  })
  clearHistory(
    @CurrentUser() user: any,
  ) {
    return this.usersService.clearHistory(user.sub);
  }

  @Get('liked-tracks')
  @ApiOperation({
    summary: 'Obter músicas favoritas',
    description: 'Retorna as músicas que o utilizador autenticado marcou como favoritas.',
  })
  @ApiResponse({
    status: 200,
    description: 'Músicas favoritas retornadas com sucesso.',
  })
  likedTracks(
    @CurrentUser() user: any,
  ) {
    return this.usersService.getLikedTracks(user.sub);
  }

  @Get('downloads')
  @ApiOperation({
    summary: 'Obter histórico de downloads',
    description: 'Retorna o histórico de downloads do utilizador autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Histórico de downloads retornado com sucesso.',
  })
  downloads(
    @CurrentUser() user: any,
  ) {
    return this.usersService.getDownloads(user.sub);
  }

  @Get('following')
  @ApiOperation({
    summary: 'Obter artistas seguidos',
    description: 'Retorna os artistas seguidos pelo utilizador autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de artistas seguidos retornada com sucesso.',
  })
  following(
    @CurrentUser() user: any,
  ) {
    return this.usersService.getFollowing(user.sub);
  }

  @Patch()
  @ApiOperation({
    summary: 'Atualizar conta',
    description: 'Atualiza os dados da conta do utilizador autenticado.',
  })
  @ApiResponse({
    status: 200,
    description: 'Conta atualizada com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilizador não encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'O username informado já está em uso.',
  })
  updateAccount(
    @CurrentUser() user: any,
    @Body() dto: UpdateAccountDto,
  ) {
    return this.usersService.updateAccount(
      user.sub,
      dto,
    );
  }

  @Patch('password')
  @ApiOperation({
    summary: 'Alterar senha',
    description:
      'Altera a senha do utilizador autenticado. É necessário informar a senha atual e a nova senha.',
  })
  @ApiResponse({
    status: 200,
    description: 'Senha alterada com sucesso.',
    schema: {
      example: {
        message: 'Senha alterada com sucesso',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'A senha atual está incorreta ou o utilizador não está autenticado.',
  })
  @ApiResponse({
    status: 404,
    description: 'Utilizador não encontrado.',
  })
  @ApiResponse({
    status: 409,
    description: 'A nova senha é igual à senha atual.',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados enviados são inválidos.',
  })
  changePassword(
    @CurrentUser() user: any,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(
      user.sub,
      dto.currentPassword,
      dto.newPassword,
    );
  }
}