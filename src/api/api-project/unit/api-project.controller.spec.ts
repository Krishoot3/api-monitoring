/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { ApiProjectController } from '../api-project.controller';
import { ApiProjectService } from '../api-project.service';
import { PostBodyDto } from '../dto/postBody.dto';
import { PutBodyDto } from '../dto/putBody.dto';

describe('Unit test Api-Project controller', () => {
  let apiProjectController: ApiProjectController;
  let spyService: ApiProjectService;
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiProjectService,
      useFactory: () => ({
        findProject: jest.fn(() => {}),
        findLangs: jest.fn(() => {}),
        findReleases: jest.fn(() => {}),
        findLastRelease: jest.fn(() => {}),
        createProject: jest.fn(() => {}),
        updateProject: jest.fn(() => {}),
      }),
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiProjectController],
      providers: [ApiProjectService, ApiServiceProvider],
    }).compile();

    apiProjectController = app.get<ApiProjectController>(ApiProjectController);
    spyService = app.get<ApiProjectService>(ApiProjectService);
  });

  it('Call findProject method', () => {
    apiProjectController.findProject('apollo');
    expect(spyService.findProject).toHaveBeenCalled();
    expect(spyService.findProject).toHaveBeenCalledWith('apollo');
  });
  it('Call findLangs method', () => {
    apiProjectController.findLangs('apollo');
    expect(spyService.findLangs).toHaveBeenCalled();
    expect(spyService.findLangs).toHaveBeenCalledWith('apollo');
  });
  it('Call findReleases method', () => {
    apiProjectController.findReleases('apollo');
    expect(spyService.findReleases).toHaveBeenCalled();
    expect(spyService.findReleases).toHaveBeenCalledWith('apollo');
  });
  it('Call findLastRelease method', () => {
    apiProjectController.findLastRelease('apollo', 'MAC', 'BIN');
    expect(spyService.findLastRelease).toHaveBeenCalled();
    expect(spyService.findLastRelease).toHaveBeenCalledWith(
      'apollo',
      'MAC',
      'BIN',
    );
  });
  it('Call createProject method', () => {
    const postBodyDto = new PostBodyDto();
    apiProjectController.createProject(postBodyDto);
    expect(spyService.createProject).toHaveBeenCalled();
    expect(spyService.createProject).toHaveBeenCalledWith(postBodyDto);
  });
  it('Call updateProject method', () => {
    const updateBodyDto = new PutBodyDto();
    apiProjectController.updateProject('apollo', updateBodyDto);
    expect(spyService.updateProject).toHaveBeenCalled();
    expect(spyService.updateProject).toHaveBeenCalledWith(
      'apollo',
      updateBodyDto,
    );
  });
});
