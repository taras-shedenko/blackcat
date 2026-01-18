import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Photo } from './photo.entity';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Photo)
  photos: Photo[];
}
