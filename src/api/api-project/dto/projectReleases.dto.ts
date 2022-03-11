import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';
import { ReleaseAssetsDto } from './releaseAssets.dto';

export class ProjectReleasesDto extends BaseDto {
  @ApiProperty({
    default: 'project-name',
  })
  name: string;

  @ApiProperty({
    default: 'tag-name',
  })
  tag_name: string;

  @ApiProperty({
    default: 'Some description',
  })
  description: string;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  assets: ReleaseAssetsDto[];
}
