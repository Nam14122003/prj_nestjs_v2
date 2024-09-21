import { Category } from "@/category/entities/category.entity";
import { User } from "@/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    summary: string;

    @Column( {type: 'text'}) 
    description: string;
    
    @Column()
    thumbnail: string;

    @Column({type: "int", default: 1})
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.posts, {
         onDelete: "CASCADE"
    })
    user: User

    @ManyToOne(() => Category, (category) => category.posts)
    category: Category
}