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
  bio: String;

  @Column({ nullable: true })
  otherName: String;

  @Column({ nullable: true })
  job: String;

  @Column({ nullable: true })
  workplace: String;

  @Column({ name: 'high_school', nullable: true })
  highSchool: String;

  @Column({ nullable: true })
  college: String;

  @Column({ nullable: true })
  currentCity: String;

  @Column({ nullable: true })
  hometown: String;

  @Column({ nullable: true })
  instagram: String;

  @Column({ type: 'enum', enum: Relationship, nullable: true })
  relationship: Relationship;

  @OneToOne(() => User, user => user.userDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  user: User;
}
