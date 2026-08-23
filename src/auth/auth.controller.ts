import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthGuard } from "./auth.guard";
import { CurrentUser } from "./auth.decorators";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthService,
  ) { }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: any) {
    return user;
  }
}