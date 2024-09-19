import { IsNotEmpty } from "class-validator";
import { Category } from "@/category/entities/category.entity";
import { User } from "@/user/entities/user.entity";

export class CreatePostDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    thumbnail: string;

    status: number;

    user: User

    @IsNotEmpty()
    category: Category;
}   