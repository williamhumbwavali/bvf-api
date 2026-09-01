import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayUnique, IsArray, IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ example: 'After Hours' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ example: 2020 })
  @IsOptional()
  @IsInt()
  @Min(1)
  year?: number;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/covers/after-hours.jpg' })
  @IsOptional()
  @IsString()
  coverUrl?: string;

  @ApiPropertyOptional({ type: [String], description: 'IDs das músicas do próprio artista a incluir no álbum.' })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  trackIds?: string[];
}
