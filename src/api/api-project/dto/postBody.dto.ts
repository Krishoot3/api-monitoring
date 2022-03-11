import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsISO8601,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class PostBodyDto {
  @ApiProperty({
    default: 125,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    default: 'project-name',
  })
  @IsString()
  @MaxLength(32)
  name: string;

  @ApiProperty({
    default: 'project-path',
  })
  @IsString()
  @MaxLength(32)
  path: string;

  @ApiProperty({
    default: 'Some description',
  })
  @IsString()
  @MaxLength(255)
  description: string;

  @ApiProperty({
    default: 'https://www.url.com',
  })
  @IsUrl()
  @MaxLength(255)
  webUrl: string;

  @ApiProperty({
    default: 'https://www.avatar.com',
  })
  @IsUrl()
  @MaxLength(255)
  avatarUrl: string;

  @ApiProperty({
    default: 'private',
  })
  @IsIn(['private', 'public'])
  @MaxLength(8)
  visibility: string;

  @ApiProperty({
    default: '2022-02-04',
  })
  @IsISO8601()
  createdAt: string;

  @ApiProperty({
    default: '2022-02-05',
  })
  @IsISO8601()
  lastActivityAt: string;
}
