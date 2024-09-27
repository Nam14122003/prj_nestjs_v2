import { Category } from "@/modules/category/entities/category.entity";
import { User } from "@/modules/user/entities/user.entity";
export declare class CreatePostDto {
    title: string;
    description: string;
    thumbnail: string;
    status: number;
    user: User;
    category: Category;
}
