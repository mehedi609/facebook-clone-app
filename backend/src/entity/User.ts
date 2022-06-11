import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, IsEmpty, IsNotEmpty, validate } from 'class-validator';
import bcrypt from 'bcryptjs';
import CustomError from '../erros/customError';
import validationErrorMessages from '../utils/modifyValidationError';
import { HttpCodes } from '../utils/http-codes';
import { UserDetails } from './UserDetails';
import { Follower } from './Follower';
import { Following } from './Following';
import { Friend } from './Friend';
import { Request } from './Request';
import { SearchUser } from './SearchUser';
import { SavedPost } from './SavedPost';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  @IsNotEmpty({
    message: '$property is required',
  })
  firstName: string;

  @Column({ name: 'last_name' })
  @IsNotEmpty({
    message: '$property is required',
  })
  lastName: string;

  @Column({ unique: true })
  @IsNotEmpty({
    message: '$property is required',
  })
  username: string;

  @Column({ unique: true })
  @IsEmail({ message: 'provide a valid $property' })
  @IsNotEmpty({
    message: '$property is required',
  })
  email: string;

  @Column()
  @IsNotEmpty({
    message: '$property is required',
  })
  password: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  cover: string;

  @Column({
    type: 'enum',
    enum: Gender,
  })
  @IsNotEmpty({
    message: '$property is required',
  })
  gender: Gender;

  @Column({ name: 'b_year' })
  @IsNotEmpty({
    message: '$property is required',
  })
  bYear: number;

  @Column({ name: 'b_month' })
  @IsNotEmpty({
    message: '$property is required',
  })
  bMonth: number;

  @Column({ name: 'b_day' })
  @IsNotEmpty({
    message: '$property is required',
  })
  bDay: number;

  @Column({ default: false })
  verified: boolean;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @OneToOne(() => UserDetails, userDetails => userDetails.user, {
    cascade: true,
  })
  userDetails: UserDetails;

  @OneToMany(() => Follower, follower => follower.user)
  followers: Follower[];

  @OneToMany(() => Following, following => following.user)
  followings: Following[];

  @OneToMany(() => Friend, friend => friend.user)
  friends: Friend[];

  @OneToMany(() => Request, request => request.user)
  requests: Request[];

  @OneToMany(() => SearchUser, searchUser => searchUser.user)
  searchUsers: SearchUser[];

  @OneToMany(() => SavedPost, savedPost => savedPost.user)
  posts: SavedPost[];

  @BeforeInsert()
  async validateBeforeInsert() {
    const errors = await validate(this, { validationError: { target: false } });
    if (errors.length > 0) {
      throw new CustomError(validationErrorMessages(errors), HttpCodes.BAD_REQUEST);
    }
  }

  @BeforeInsert()
  hashedPassword() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
