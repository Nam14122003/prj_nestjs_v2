/// <reference types="multer" />
import { UserService } from '@/modules/user/user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { FillterUserDto } from '@/modules/user/dto/fillter-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    findAll(query: FillterUserDto): Promise<User[]>;
    profile(req: any): Promise<User>;
    findOne(id: string): Promise<User>;
    create(dto: CreateUserDto): Promise<User>;
    update(id: string, dto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    multipleDelete(ids: string[]): Promise<import("typeorm").DeleteResult>;
    delete(id: string): Promise<import("typeorm").DeleteResult>;
    uploadAvatar(req: any, file: Express.Multer.File): void;
}
