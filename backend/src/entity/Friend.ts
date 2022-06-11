import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'friends' })
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'friend_id' })
  friendId: number;

  @ManyToOne(() => User, user => user.friends)
  user: User;
}
