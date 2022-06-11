import { validate } from 'class-validator';
import { UserRepository } from '../repositories/user.repository';
import CustomError from '../erros/customError';
import { HttpCodes } from '../utils/http-codes';
import validationErrorMessages from '../utils/modifyValidationError';
import { User } from '../entity/User';

export default class UserService {
  private userRepository = UserRepository;

  public findAll = async () => {
    return UserRepository.find();
  };

  public register = async userData => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
      picture,
    } = userData;
    const user = this.userRepository.create({
      firstName,
      lastName,
      username,
      email,
      password,
      gender,
      bYear,
      bMonth,
      bDay,
      picture,
    });
    return this.userRepository.save(user);
  };

  public findUserByEmail = async (email: string) =>
    this.userRepository.findUserByEmail(email);

  public findUserByUsername = async (username: string) =>
    this.userRepository.findUserByUsername(username);

  public findUserById = async (id: number) => this.userRepository.findOneBy({ id });

  public updateVerifiedStatus = async (id: number, verified: boolean) => {
    return this.userRepository.update(id, { verified });
  };
}
