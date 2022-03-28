import { Test, TestingModule } from '@nestjs/testing';
import { ApiProjectService } from '../api-project.service';
import { PostBodyDto } from '../dto/postBody.dto';
import { PutBodyDto } from '../dto/putBody.dto';
import { ApiServiceMock } from './apiServiceMock';

describe('Testing Api-Project Service', () => {
  let apiProjectService: ApiProjectService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ApiProjectService,
      useClass: ApiServiceMock,
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiProjectService, ApiServiceProvider],
    }).compile();
    apiProjectService = module.get<ApiProjectService>(ApiProjectService);
  });

  it('should call findProject method with expected params', async () => {
    const findProjectSpy = jest.spyOn(apiProjectService, 'findProject');
    apiProjectService.findProject('apollo');
    expect(findProjectSpy).toHaveBeenCalled();
    expect(findProjectSpy).toHaveBeenCalledWith('apollo');
  });
  it('should call findLangs method with expected params', async () => {
    const findLangsSpy = jest.spyOn(apiProjectService, 'findLangs');
    apiProjectService.findLangs('apollo');
    expect(findLangsSpy).toHaveBeenCalled();
    expect(findLangsSpy).toHaveBeenCalledWith('apollo');
  });
  it('should call findReleases method with expected params', async () => {
    const findReleasesSpy = jest.spyOn(apiProjectService, 'findReleases');
    apiProjectService.findReleases('apollo');
    expect(findReleasesSpy).toHaveBeenCalled();
    expect(findReleasesSpy).toHaveBeenCalledWith('apollo');
  });
  it('should call findLastRelease method with expected params', async () => {
    const findLastReleaseSpy = jest.spyOn(apiProjectService, 'findLastRelease');
    apiProjectService.findLastRelease('apollo', 'MAC', 'BIN');
    expect(findLastReleaseSpy).toHaveBeenCalled();
    expect(findLastReleaseSpy).toHaveBeenCalledWith('apollo', 'MAC', 'BIN');
  });
  it('should call createProject method with expected params', async () => {
    const createProjectSpy = jest.spyOn(apiProjectService, 'createProject');
    const postBodyDto = new PostBodyDto();
    apiProjectService.createProject(postBodyDto);
    expect(createProjectSpy).toHaveBeenCalledWith(postBodyDto);
    expect(createProjectSpy).toHaveBeenCalled();
  });
  it('should call updateProject method with expected params', async () => {
    const updateProjectSpy = jest.spyOn(apiProjectService, 'updateProject');
    const updateBodyDto = new PutBodyDto();
    apiProjectService.updateProject('apollo', updateBodyDto);
    expect(updateProjectSpy).toHaveBeenCalledWith('apollo', updateBodyDto);
    expect(updateProjectSpy).toHaveBeenCalled();
  });
});
