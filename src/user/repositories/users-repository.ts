import { User } from 'src/user/dtos/user-attributes';

export abstract class UsersRepository {
  abstract create(userInfo: User, role: string): Promise<void>;

  abstract find(role: string, userInfo: User): Promise<void>;
}
