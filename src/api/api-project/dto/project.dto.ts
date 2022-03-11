import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class ProjectDto extends BaseDto {
  @ApiProperty({
    default: 'project-name',
  })
  name: string;

  @ApiProperty({
    default: 'Some description',
  })
  description: string;

  @ApiProperty({
    default: 'https://www.url.com',
  })
  web_url: string;

  @ApiProperty({
    default: 'private',
  })
  visibility: string;
}
