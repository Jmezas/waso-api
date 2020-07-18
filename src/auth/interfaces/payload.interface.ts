import { Role } from '../../role/local/role.entity';

export interface IJwtPayload {
  id: string;
  username: string;
  email: string;
  role: Role;
  iat?: Date;
}
