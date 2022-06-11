import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'request_user_id' })
  requestUserId: number;

  @ManyToOne(() => User, user => user.requests)
  user: User;
}
