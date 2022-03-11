import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from './base.dto';

export class ReleaseAssetsDto extends BaseDto {
  @ApiProperty({
    default: 'SRC',
  })
  type: 'SRC' | 'BIN';

  @ApiProperty({
    default: 'ALL',
  })
  architecture: 'ALL' | 'LIN' | 'WIN' | 'MAC';

  @ApiProperty({
    default: 'https://www.url.com',
  })
  url: string;
}
