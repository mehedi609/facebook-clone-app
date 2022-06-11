import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'search_users' })
export class SearchUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'search_user_id' })
  searchUserId: number;

  @ManyToOne(() => User, user => user.searchUsers)
  user: User;
}
