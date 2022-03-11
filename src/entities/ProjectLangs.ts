import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Project } from './Project';

@Index('project', ['project'], {})
@Entity('projectlangs', { schema: 'apollo' })
export class ProjectLangs {
  @Column('int', { primary: true, name: 'project' })
  project: number;

  @Column('varchar', { primary: true, name: 'lang', length: 32 })
  lang: string;

  @Column('float', { name: 'percent', precision: 12 })
  percent: number;

  @ManyToOne(() => Project, (project) => project.projectLangs, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'project', referencedColumnName: 'id' }])
  project_id: Project;
}
