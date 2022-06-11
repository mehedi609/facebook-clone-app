import { validate } from 'class-validator';
import { UserRepository } from '../repositories/user.repository';
import CustomError from '../erros/customError';
import { HttpCodes } from '../utils/http-codes';
import validationErrorMessages from '../utils/modifyValidationError';
import { User } from '../entity/User';

export default class UserService {
  private userRepository = UserRepository;

  findAll = async () => {
    return UserRepository.find();
  };

  register = async userData => {
    const user = this.userRepository.create(userData);
    return UserRepository.save(user);
  };

  findUserByEmail = async (email: string) => this.userRepository.findUserByEmail(email);

  findUserByUsername = async (username: string) =>
    this.userRepository.findUserByUsername(username);
}
