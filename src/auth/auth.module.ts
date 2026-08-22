import {
  Module,
} from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User, Role } from 'src/database/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { Artist } from 'src/database/entities/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Artist]),

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '7d',
      },
    }),
  ],

  providers: [
    AuthService,
    AuthGuard,
  ],

  controllers: [
    AuthController,
  ],

  exports: [
    AuthGuard,
    AuthService,
    JwtModule,
  ],
})
export class AuthModule {}