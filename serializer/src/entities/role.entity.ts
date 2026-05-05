export class RoleEntity {
  id: number;
  name: string;

  constructor(role: Partial<RoleEntity>) {
    Object.assign(this, role);
  }
}
