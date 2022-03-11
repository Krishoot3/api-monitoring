import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from './Project';
import { ReleaseAssets } from './ReleaseAssets';

@Index('project', ['project'], {})
@Entity('projectreleases', { schema: 'apollo' })
export class ProjectReleases {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'project' })
  project: number;

  @Column('varchar', { name: 'name', length: 32 })
  name: string;

  @Column('varchar', { name: 'tag_name', length: 32 })
  tagName: string;

  @Column('varchar', { name: 'description', length: 255 })
  description: string;

  @Column('date', { name: 'created_at' })
  createdAt: string;

  @ManyToOne(() => Project, (project) => project.projectReleases, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'project', referencedColumnName: 'id' }])
  project_id: Project;

  @OneToMany(
    () => ReleaseAssets,
    (releaseAssets) => releaseAssets.projectReleases,
  )
  releaseAssets: ReleaseAssets[];
}
