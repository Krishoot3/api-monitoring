import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiProjectService } from './api-project.service';
import { PostBodyDto } from './dto/postBody.dto';
import { ProjectDto } from './dto/project.dto';
import { ProjectLangsDto } from './dto/projectLangs.dto';
import { ProjectReleasesDto } from './dto/projectReleases.dto';
import { PutBodyDto } from './dto/putBody.dto';
import { ReleaseAssetsDto } from './dto/releaseAssets.dto';

@ApiTags('api/project')
@Controller('api/project')
export class ApiProjectController {
  constructor(private readonly apiProjectService: ApiProjectService) {}

  @ApiOkResponse({
    description: 'Find project by path',
    type: ProjectDto,
  })
  @Get(':path')
  async findProject(@Param('path') path: string): Promise<ProjectDto> {
    return this.apiProjectService.findProject(path);
  }

  @ApiOkResponse({
    description: 'Update existing project',
    type: ProjectDto,
  })
  @ApiQuery({
    name: 'apiKey',
    type: String,
    description: 'API-KEY Authorization',
    required: true,
  })
  @Put(':path')
  async update(
    @Param('path') path: string,
    @Body() putBody: PutBodyDto,
  ): Promise<ProjectDto> {
    return this.apiProjectService.update(path, putBody);
  }

  @ApiCreatedResponse({
    description: 'Create a new project',
    type: ProjectDto,
  })
  @ApiQuery({
    name: 'apiKey',
    type: String,
    description: 'API-KEY Authorization',
    required: true,
  })
  @Post()
  async create(@Body() postBody: PostBodyDto): Promise<ProjectDto> {
    return this.apiProjectService.create(postBody);
  }

  @ApiOkResponse({
    description: 'Find project langs',
    type: [ProjectLangsDto],
  })
  @Get(':path/langs')
  async findLangs(@Param('path') path: string): Promise<ProjectLangsDto[]> {
    return this.apiProjectService.findLangs(path);
  }

  @ApiOkResponse({
    description: 'Find project releases',
    type: [ProjectReleasesDto],
  })
  @Get(':path/releases')
  async findReleases(
    @Param('path') path: string,
  ): Promise<ProjectReleasesDto[]> {
    return this.apiProjectService.findReleases(path);
  }

  @ApiOkResponse({
    description: 'Find last release',
    type: ReleaseAssetsDto,
  })
  @ApiQuery({
    name: 'architecture',
    type: String,
    description: 'Optional architecture parameter',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    type: String,
    description: 'Optional type parameter',
    required: false,
  })
  @Get(':path/last-release')
  async findLastRelease(
    @Param('path') path: string,
    @Query('architecture') architecture: string,
    @Query('type') type: string,
  ): Promise<ReleaseAssetsDto> {
    return this.apiProjectService.findLastRelease(path, architecture, type);
  }
}
