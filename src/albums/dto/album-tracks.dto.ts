import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsUUID } from 'class-validator';

export class AlbumTracksDto {
  @ApiProperty({ type: [String], description: 'IDs das músicas a adicionar.' })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  trackIds: string[];
}
