import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProjectReleases } from './ProjectReleases';

@Index('release', ['release'], {})
@Entity('releaseassets', { schema: 'apollo' })
export class ReleaseAssets {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'release' })
  release: number;

  @Column({
    name: 'type',
    type: 'enum',
    enum: ['SRC', 'BIN'],
    //default: () => "'SRC'",
  })
  type: 'SRC' | 'BIN';

  @Column({
    name: 'architecture',
    type: 'enum',
    enum: ['ALL', 'LIN', 'WIN', 'MAC'],
    //default: () => "'ALL'",
  })
  architecture: 'ALL' | 'LIN' | 'WIN' | 'MAC';

  @Column('varchar', { name: 'url', length: 255 })
  url: string;

  @Column('decimal', { name: 'file_size', precision: 3, scale: 2 })
  file_size: number;

  @ManyToOne(
    () => ProjectReleases,
    (projectReleases) => projectReleases.releaseAssets,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'release', referencedColumnName: 'id' }])
  projectReleases: ProjectReleases;
}
