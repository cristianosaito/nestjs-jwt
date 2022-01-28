import { userStatus, userRole } from '../entities/user.entity';

export class CreateUserDto {
  id: string;

  name: string;

  username: string;

  password: string;

  status: userStatus;

  role: userRole;
}
