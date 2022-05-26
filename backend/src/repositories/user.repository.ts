import { User } from '@/entity/User';
import { AppDataSource } from '@/data-source';

export const userRepository = AppDataSource.getRepository(User);
