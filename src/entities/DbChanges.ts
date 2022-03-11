import { Column, Entity } from 'typeorm';

@Entity('dbchanges', { schema: 'apollo' })
export class DbChanges {
  @Column('varchar', { primary: true, name: 'file', length: 64 })
  file: string;

  @Column('datetime', {
    name: 'updateDate',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateDate: Date;

  @Column('enum', { name: 'status', enum: ['success', 'error'] })
  status: 'success' | 'error';
}
