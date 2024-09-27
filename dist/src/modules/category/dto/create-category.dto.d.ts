import { Post } from "@/modules/post/entities/post.entity";
export declare class CreateCategoryDto {
    name: string;
    description: string;
    status: number;
    post: Post;
}
