import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  async getResponse(): Promise<string> {
    return 'OK';
  }
}
