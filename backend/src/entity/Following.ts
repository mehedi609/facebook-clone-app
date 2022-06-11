import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'followings' })
export class Following {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'following_id' })
  followingId: number;

  @ManyToOne(() => User, user => user.followings)
  user: User;
}
