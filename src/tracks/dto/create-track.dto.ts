import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

import {
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class TrackDto {
  @ApiProperty({
    example: 'Bad Vibes Forever',
    description: 'Título da música',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'Hip-Hop',
    description: 'Gênero musical',
  })
  @IsOptional()
  @IsString()
  genreId?: string;

  @ApiPropertyOptional({
    example: 215,
    description: 'Duração da música em segundos',
  })
  @IsOptional()
  @IsInt()
  durationSec?: number;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/audio/track.mp3',
    description: 'URL do arquivo de áudio',
  })
  @IsOptional()
  @IsString()
  audioUrl?: string;

  @ApiPropertyOptional({
    example: 'https://cdn.example.com/covers/track.jpg',
    description: 'URL da capa da música',
  })
  @IsOptional()
  @IsString()
  coverUrl?: string;

  @ApiPropertyOptional({
    example: '550e8400-e29b-41d4-a716-446655440000',
    description: 'ID do artista. Se não for informado, será usado o usuário autenticado.',
  })
  @IsOptional()
  @IsString()
  artistId?: string;
}