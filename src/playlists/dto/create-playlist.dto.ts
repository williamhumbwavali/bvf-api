import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class PlaylistDto {
  @ApiProperty({
    example: 'Minhas favoritas',
    description: 'Nome da playlist',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'Músicas que gosto de ouvir todos os dias',
    description: 'Descrição da playlist',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/covers/playlist.jpg',
    description: 'URL da capa da playlist',
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;
}