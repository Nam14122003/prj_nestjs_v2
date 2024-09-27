import { Post } from "@/modules/post/entities/post.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: number;

    @IsNotEmpty()
    post: Post;
}