import { IsNotEmpty } from "class-validator";
import { Category } from "@/modules/category/entities/category.entity";
import { User } from "@/modules/user/entities/user.entity";

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