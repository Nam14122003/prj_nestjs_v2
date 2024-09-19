import { Post } from '@/post/entities/post.entity';
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    refresh_token: string;
    avatar: string;
    status: number;
    roles: string;
    createdAt: Date;
    updatedAt: Date;
    codeId: string;
    codeExpired: Date;
    posts: Post[];
}
