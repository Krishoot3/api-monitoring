import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './Project';
import { Users } from './Users';

@Index('developer', ['developer'], {})
@Entity('projectcontributors', { schema: 'apollo' })
export class ProjectContributors {
  @Column('int', { primary: true, name: 'project' })
  project: number;

  @Column('int', { primary: true, name: 'developer' })
  developer: number;

  @Column('int', { name: 'commits', default: () => "'0'" })
  commits: number;

  @Column('int', { name: 'additions', default: () => "'0'" })
  additions: number;

  @Column('int', { name: 'deletions', default: () => "'0'" })
  deletions: number;

  @ManyToOne(() => Project, (project) => project.projectContributors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'project', referencedColumnName: 'id' }])
  project_id: Project;

  @ManyToOne(() => Users, (users) => users.projectContributors, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'developer', referencedColumnName: 'id' }])
  developer_id: Users;
}
