import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HealthcheckService } from './healthcheck.service';

@ApiTags('healthcheck')
@Controller('healthcheck')
export class HealthcheckController {
  constructor(private readonly healthcheckService: HealthcheckService) {}
  @ApiOkResponse({
    description: 'Check if the API works',
    type: String,
  })
  @Get()
  async getResponse(): Promise<string> {
    return this.healthcheckService.getResponse();
  }
}
