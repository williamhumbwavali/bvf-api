import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsString,
  MinLength,
} from 'class-validator';

import { Role } from 'src/database/entities/user.entity';

export class RegisterDto {
  @ApiProperty({
    example: 'William',
    description: 'Nome do utilizador',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'william@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'william',
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'senha123456',
    minLength: 8,
  })
  @MinLength(8)
  password: string;

  @ApiProperty({
    enum: Role,
    example: Role.USER,
    required: false,
  })
  @IsEnum(Role)
  role: Role = Role.USER;
}