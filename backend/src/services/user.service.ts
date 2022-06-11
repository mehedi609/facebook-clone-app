import { UserRepository } from '../repositories';
import { User } from '../entity';

export class UserService {
  private userRepository = UserRepository;

  public findAll = async () => UserRepository.find();

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

  public findUserByEmail = async (email: string): Promise<User> =>
    this.userRepository.findUserByEmail(email);

  public findUserByUsername = async (username: string) =>
    this.userRepository.findUserByUsername(username);

  public findUserById = async (id: number) => this.userRepository.findOneBy({ id });

  public updateVerifiedStatus = async (id: number, verified: boolean) =>
    this.userRepository.update(id, { verified });
}
