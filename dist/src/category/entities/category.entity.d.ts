import { Post } from "@/post/entities/post.entity";
export declare class Category {
    id: number;
    name: string;
    dascription: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
}
