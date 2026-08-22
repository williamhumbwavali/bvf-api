import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'william@email.com',
    description: 'Email da conta',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'senha123456',
    description: 'Senha da conta',
  })
  @IsString()
  password: string;
}