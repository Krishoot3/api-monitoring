import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectContributors } from './ProjectContributors';
import { ProjectLangs } from './ProjectLangs';
import { ProjectReleases } from './ProjectReleases';

@Entity('project', { schema: 'apollo' })
export class Project {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 32 })
  name: string;

  @Column('varchar', { name: 'path', length: 32 })
  path: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('date', { name: 'created_at' })
  createdAt: string;

  @Column('varchar', { name: 'web_url', length: 255 })
  webUrl: string;

  @Column('varchar', { name: 'avatar_url', nullable: true, length: 255 })
  avatarUrl: string | null;

  @Column('date', { name: 'last_activity_at' })
  lastActivityAt: string;

  @Column('varchar', { name: 'visibility', length: 8 })
  visibility: string;

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @OneToMany(
    () => ProjectContributors,
    (projectContributors) => projectContributors.project_id,
  )
  projectContributors: ProjectContributors[];

  @OneToMany(() => ProjectLangs, (projectLangs) => projectLangs.project_id)
  projectLangs: ProjectLangs[];

  @OneToMany(
    () => ProjectReleases,
    (projectReleases) => projectReleases.project_id,
  )
  projectReleases: ProjectReleases[];
}
