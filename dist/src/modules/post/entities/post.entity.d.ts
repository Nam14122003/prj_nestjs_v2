import { Category } from "@/modules/category/entities/category.entity";
import { User } from "@/modules/user/entities/user.entity";
export declare class Post {
    id: number;
    title: string;
    summary: string;
    description: string;
    thumbnail: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    category: Category;
}
