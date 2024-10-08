import { Post } from "@/modules/post/entities/post.entity";
export declare class Category {
    id: number;
    name: string;
    description: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    posts: Post[];
}
