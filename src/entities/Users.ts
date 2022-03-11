import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectContributors } from './ProjectContributors';

@Entity('users', { schema: 'apollo' })
export class Users {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'login', length: 64 })
  login: string;

  @Column('varchar', { name: 'fullName', length: 64 })
  fullName: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'email', nullable: true, length: 64 })
  email: string | null;

  @Column('varchar', { name: 'state', nullable: true, length: 16 })
  state: string | null;

  @Column('tinyint', { name: 'is_admin', default: () => "'0'" })
  isAdmin: number;

  @Column('tinyint', { name: 'is_developer', default: () => "'0'" })
  isDeveloper: number;

  @Column('varchar', { name: 'avatar_url', nullable: true, length: 255 })
  avatarUrl: string | null;

  @OneToMany(
    () => ProjectContributors,
    (projectContributors) => projectContributors.developer_id,
  )
  projectContributors: ProjectContributors[];
}
