import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ tableName: 'photos', timestamps: false })
export class Photo extends Model {
  @Column
  fileName: string;

  @ForeignKey(() => User)
  userId: number;
}
