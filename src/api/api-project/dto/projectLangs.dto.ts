import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class ProjectLangsDto extends BaseDto {
  @ApiProperty({
    default: 1,
  })
  project: number;

  @ApiProperty({
    default: 'JS',
  })
  lang: string;

  @ApiProperty({
    default: '60',
  })
  percent: number;
}
