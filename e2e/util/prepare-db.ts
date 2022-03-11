import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as f from './data.factory';
import * as faker from 'faker';
import { Project } from '../../src/entities/Project';
import { ProjectContributors } from '../../src/entities/ProjectContributors';
import { ProjectLangs } from '../../src/entities/ProjectLangs';
import { ProjectReleases } from '../../src/entities/ProjectReleases';
import { ReleaseAssets } from '../../src/entities/ReleaseAssets';
import { Users } from '../../src/entities/Users';

export const prepareDb = async (app: INestApplication) => {
  const connection = app.get(Connection);

  await connection.synchronize(true);

  await seedDb(connection);
};

const seedDb = async (connection: Connection) => {
  const path = 'projectPath';
  faker.seed(123);

  for (let i = 1; i < 3; i++) {
    await connection.getRepository(Project).save(f.newProject(path + i, i));
    await connection.getRepository(ProjectLangs).save(f.newProjectLangs(i));
    await connection
      .getRepository(ProjectReleases)
      .save(f.newProjectReleases(i));
    await connection.getRepository(ReleaseAssets).save(f.newReleaseAssets(i));
    await connection.getRepository(Users).save(f.newUsers(i));
    await connection
      .getRepository(ProjectContributors)
      .save(f.newProjectContributors(i));
  }
};
