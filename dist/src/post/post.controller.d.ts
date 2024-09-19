/// <reference types="multer" />
import { CreatePostDto } from '@/post/dto/create-post.dto';
import { PostService } from '@/post/post.service';
import { FilterPostDto } from '@/post/dto/filter-post.dto';
import { Post as PostEntity } from "@/post/entities/post.entity";
import { UpdatePostDto } from '@/post/dto/update-post.dto';
export declare class PostController {
    private postService;
    constructor(postService: PostService);
    create(req: any, createPostDto: CreatePostDto, file: Express.Multer.File): Promise<PostEntity>;
    findAll(query: FilterPostDto): Promise<any>;
    findDetail(id: string): Promise<PostEntity>;
    update(id: string, req: any, dto: UpdatePostDto, file: Express.Multer.File): Promise<import("typeorm").UpdateResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
    ckeUpload(data: any, file: Express.Multer.File): {
        url: string;
    };
}
