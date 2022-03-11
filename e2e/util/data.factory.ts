import { Project } from '../../src/entities/Project';
import { random, lorem, internet, name, address } from 'faker';
import { ProjectContributors } from '../../src/entities/ProjectContributors';
import { ProjectLangs } from '../../src/entities/ProjectLangs';
import { ProjectReleases } from '../../src/entities/ProjectReleases';
import { Users } from '../../src/entities/Users';
import { ReleaseAssets } from '../../src/entities/ReleaseAssets';

const DATE_PAST = '2019-09-18';
const DATE_ACTIVITY = '2021-02-25';
const DATE_TIME = '2021-09-30 17:07:35';

export const newProject = (name: string, id: number) =>
  Object.assign(new Project(), {
    id: id,
    name: name,
    path: name,
    description: lorem.words(20),
    createdAt: DATE_PAST,
    webUrl: internet.url(),
    avatarUrl: internet.url(),
    lastActivityAt: DATE_ACTIVITY,
    visibility: random.objectElement(['private', 'public']),
    lastUpdate: DATE_TIME,
  });

export const newProjectContributors = (id: number) =>
  Object.assign(new ProjectContributors(), {
    project: id,
    developer: id,
    commits: random.number(50),
    additions: random.number(20),
    deletions: random.number(30),
  });

export const newProjectLangs = (id: number) =>
  Object.assign(new ProjectLangs(), {
    project: id,
    lang: random.objectElement(['JS', 'PHP']),
    percent: random.number(10),
  });

export const newProjectReleases = (id: number) =>
  Object.assign(new ProjectReleases(), {
    id: id,
    project: id,
    name: lorem.word(),
    tagName: lorem.word(),
    description: lorem.words(10),
    createdAt: DATE_PAST,
  });

export const newReleaseAssets = (id: number) =>
  Object.assign(new ReleaseAssets(), {
    id: id,
    release: id,
    type: random.objectElement(['SRC', 'BIN']),
    architecture: random.objectElement(['ALL', 'LIN', 'WIN', 'MAC']),
    url: internet.url(),
    file_size: random.number({ min: 0, max: 9.99 }),
  });

export const newUsers = (id: number) =>
  Object.assign(new Users(), {
    id: id,
    login: internet.userName(),
    fullName: name.firstName(),
    password: internet.password(),
    email: internet.email(),
    state: address.county(),
    isAdmin: random.number({ min: 0, max: 1 }),
    isDeveloper: random.number({ min: 0, max: 1 }),
    avatarUrl: internet.url(),
  });
