import { Repository, EntityRepository } from 'typeorm';
import { User } from '../user/local/user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {}
