import { Category } from "@/modules/category/entities/category.entity";
export declare class UpdatePostDto {
    title: string;
    description: string;
    thumbnail: string;
    status: number;
    category: Category;
}
