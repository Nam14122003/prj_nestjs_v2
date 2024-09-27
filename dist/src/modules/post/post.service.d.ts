import { CreatePostDto } from '@/modules/post/dto/create-post.dto';
import { Post } from '@/modules/post/entities/post.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { FilterPostDto } from '@/modules/post/dto/filter-post.dto';
import { UpdatePostDto } from '@/modules/post/dto/update-post.dto';
export declare class PostService {
    private useRepository;
    private postRepository;
    constructor(useRepository: Repository<User>, postRepository: Repository<Post>);
    create(userId: number, dto: CreatePostDto): Promise<Post>;
    findAll(query: FilterPostDto): Promise<any>;
    findDetail(id: number): Promise<Post>;
    update(id: number, dto: UpdatePostDto): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
}
