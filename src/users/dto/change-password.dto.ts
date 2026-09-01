import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Senha atual do utilizador.',
    example: 'MinhaSenha123!',
    minLength: 8,
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: 'Nova senha do utilizador.',
    example: 'NovaSenha456!',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  newPassword: string;
}