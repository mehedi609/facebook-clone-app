import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinTable } from 'typeorm';
import { User } from './User';

export enum Relationship {
  SINGLE = 'Single',
  IN_A_RELATIONSHIP = 'In a relationship',
  MARRIED = 'Married',
  DIVORCED = 'Divorced',
}

@Entity({ name: 'user_details' })
export class UserDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  otherName: string;

  @Column({ nullable: true })
  job: string;

  @Column({ nullable: true })
  workplace: string;

  @Column({ name: 'high_school', nullable: true })
  highSchool: string;

  @Column({ nullable: true })
  college: string;

  @Column({ nullable: true })
  currentCity: string;

  @Column({ nullable: true })
  hometown: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ type: 'enum', enum: Relationship, nullable: true })
  relationship: Relationship;

  @OneToOne(() => User, user => user.userDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  user: User;
}
