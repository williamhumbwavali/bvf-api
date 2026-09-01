import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, ArrayUnique, IsArray, IsUUID } from 'class-validator';

export class PlaylistTracksDto {
  @ApiProperty({ type: [String], description: 'IDs das músicas a adicionar à playlist.' })
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('4', { each: true })
  trackIds: string[];
}
