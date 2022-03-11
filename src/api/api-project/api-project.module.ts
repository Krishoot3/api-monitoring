import { Module } from '@nestjs/common';
import { ApiProjectService } from './api-project.service';
import { ApiProjectController } from './api-project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entities/Project';
import { ProjectLangs } from '../../entities/ProjectLangs';
import { ProjectReleases } from '../../entities/ProjectReleases';
import { ReleaseAssets } from '../../entities/ReleaseAssets';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectLangs,
      ProjectReleases,
      ReleaseAssets,
    ]),
  ],
  controllers: [ApiProjectController],
  providers: [ApiProjectService],
})
export class ApiProjectModule {}
