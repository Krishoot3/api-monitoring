import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../app.module';
import { ApiProjectService } from '../api-project.service';

describe('API-Project unit test', () => {
  let service: ApiProjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<ApiProjectService>(ApiProjectService);
  });

  it('should be defined', async () => {
    const result = await service.findProject('apollo');
    expect(result).toBeDefined();
  });
});
