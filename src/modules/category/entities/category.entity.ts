
import { Post } from "@/modules/post/entities/post.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column({type: "int", default: 1})
    status: number;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Post, (post) => post.category)
    posts: Post[];
}