import { Post } from '@/modules/post/entities/post.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true, default: null })
  refresh_token: string;

  @Column({nullable: true, default: null })
  avatar: string;

  @Column()
  status: number;

  @Column({default: 'User'})
  roles: string;

  @CreateDateColumn()
  createdAt: Date; 

  @CreateDateColumn()
  updatedAt: Date; 

  @Column()
  codeId: string;

  @CreateDateColumn()
  codeExpired:Date;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]
}