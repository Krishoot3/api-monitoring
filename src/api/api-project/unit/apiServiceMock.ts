import { PostBodyDto } from '../dto/postBody.dto';
import { PutBodyDto } from '../dto/putBody.dto';

export class ApiServiceMock {
  findProject(path: string) {
    return path;
  }
  findLangs(path: string) {
    return path;
  }
  findReleases(path: string) {
    return path;
  }
  findLastRelease(path: string, architecture: string, type: string) {
    return {
      path,
      architecture,
      type,
    };
  }
  createProject(postBodyDto: PostBodyDto) {
    return postBodyDto;
  }
  updateProject(path: string, updateBodyDto: PutBodyDto) {
    return {
      path,
      updateBodyDto,
    };
  }
}
