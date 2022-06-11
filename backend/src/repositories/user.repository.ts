import { User } from '../entity';
import { AppDataSource } from '../data-source';

export const UserRepository = AppDataSource.getRepository(User).extend({
  findUserByEmail(email: string) {
    return this.findOneBy({ email });
  },

  findUserByUsername(username: string) {
    return this.findOneBy({ username });
  },
});
