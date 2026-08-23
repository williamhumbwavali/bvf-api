import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateAccountDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name?: string

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username?: string

  @IsOptional()
  @IsString()
  @MaxLength(500)
  bio?: string

  @IsOptional()
  @IsString()
  @MaxLength(100)
  genre?: string

  @IsOptional()
  @IsString()
  avatarUrl?: string
}