import { Exclude, Expose, Transform } from 'class-transformer';
import { RoleEntity } from './role.entity';

export class UserEntity {
  id: number;
  firstName: string;
  lastName: string;
  @Exclude()
  password: string;
  @Expose()
  get fullName(): string {
    return [this.firstName, this.lastName].join(' ');
  }
  @Transform(({ value }) => value.name)
  role: RoleEntity;
  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
