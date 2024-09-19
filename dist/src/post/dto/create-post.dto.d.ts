import { Category } from "@/category/entities/category.entity";
import { User } from "@/user/entities/user.entity";
export declare class CreatePostDto {
    title: string;
    description: string;
    thumbnail: string;
    status: number;
    user: User;
    category: Category;
}
