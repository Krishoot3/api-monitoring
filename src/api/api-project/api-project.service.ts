import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../entities/Project';
import { ProjectLangs } from '../../entities/ProjectLangs';
import { ProjectReleases } from '../../entities/ProjectReleases';
import { ReleaseAssets } from '../../entities/ReleaseAssets';
import { PostBodyDto } from './dto/postBody.dto';
import { ProjectDto } from './dto/project.dto';
import { ProjectLangsDto } from './dto/projectLangs.dto';
import { ProjectReleasesDto } from './dto/projectReleases.dto';
import { PutBodyDto } from './dto/putBody.dto';
import { ReleaseAssetsDto } from './dto/releaseAssets.dto';

@Injectable()
export class ApiProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    @InjectRepository(ProjectLangs)
    private projectLangsRepository: Repository<ProjectLangs>,
    @InjectRepository(ProjectReleases)
    private projectReleasesRepository: Repository<ProjectReleases>,
    @InjectRepository(ReleaseAssets)
    private releaseAssetsRepository: Repository<ReleaseAssets>,
  ) {}
  async findProject(path: string): Promise<ProjectDto> {
    const project = await this.projectRepository.findOneOrFail({
      where: { path: path },
    });
    const { name, description, webUrl, visibility } = project;
    return new ProjectDto({
      name,
      description,
      web_url: webUrl,
      visibility,
    });
  }

  async updateProject(path: string, putBody: PutBodyDto): Promise<ProjectDto> {
    const projectFind = await this.projectRepository.findOneOrFail({
      where: { path: path },
    });
    const projectPreload = await this.projectRepository.preload({
      id: projectFind.id,
      ...putBody,
    });
    const project = await this.projectRepository.save(projectPreload);
    const { name, description, webUrl, visibility } = project;
    return new ProjectDto({
      name,
      description,
      web_url: webUrl,
      visibility,
    });
  }

  async createProject(postBody: PostBodyDto): Promise<ProjectDto> {
    const projectFind = await this.projectRepository.findOne({
      where: [{ id: postBody.id }, { path: postBody.path }],
    });
    if (projectFind) {
      throw new BadRequestException({
        error: 'Defined id or path already exists in database!',
      });
    }
    const projectCreate = this.projectRepository.create(postBody);
    const project = await this.projectRepository.save(projectCreate);
    const { name, description, webUrl, visibility } = project;
    return new ProjectDto({
      name,
      description,
      web_url: webUrl,
      visibility,
    });
  }

  async findLangs(path: string): Promise<ProjectLangsDto[]> {
    const project = await this.projectRepository.findOneOrFail({
      where: { path: path },
    });
    await this.projectLangsRepository.findOneOrFail({
      where: { project: project.id },
    });
    const projectLangs = await this.projectLangsRepository.find({
      where: { project: project.id },
    });
    return projectLangs.map(
      ({ project, lang, percent }) =>
        new ProjectLangsDto({
          project,
          lang,
          percent,
        }),
    );
  }

  async findReleases(path: string): Promise<ProjectReleasesDto[]> {
    const project = await this.projectRepository.findOneOrFail({
      where: { path: path },
    });
    await this.projectReleasesRepository.findOneOrFail({
      where: { project: project.id },
    });
    const releases = await this.projectReleasesRepository.find({
      where: { project: project.id },
      relations: ['releaseAssets'],
    });
    return releases.map(
      ({ name, tagName, description, createdAt, releaseAssets }) =>
        new ProjectReleasesDto({
          name,
          tag_name: tagName,
          description,
          created_at: createdAt,
          assets: releaseAssets.map(
            ({ type, architecture, url }) =>
              new ReleaseAssetsDto({
                type,
                architecture,
                url,
              }),
          ),
        }),
    );
  }

  async findLastRelease(
    path: string,
    architecture: string,
    type: string,
  ): Promise<ReleaseAssetsDto> {
    const project = await this.projectRepository.findOneOrFail({
      where: { path: path },
    });
    const release = await this.projectReleasesRepository.findOneOrFail({
      where: { project: project.id },
      order: { createdAt: 'DESC' },
    });
    if (!architecture) architecture = 'ALL';
    if (!type) type = 'BIN';
    const releaseAsset = await this.releaseAssetsRepository.findOneOrFail({
      where: { release: release.id, architecture: architecture, type: type },
    });
    return new ReleaseAssetsDto({
      type: releaseAsset.type,
      architecture: releaseAsset.architecture,
      url: releaseAsset.url,
    });
  }
}
