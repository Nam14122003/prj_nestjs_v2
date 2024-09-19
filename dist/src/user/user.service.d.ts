import { User } from '@/user/entities/user.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';
import { FillterUserDto } from '@/user/dto/fillter-user.dto';
export declare class UserService {
    private userRespository;
    constructor(userRespository: Repository<User>);
    findAll(query: FillterUserDto): Promise<any>;
    findOne(id: number): Promise<User>;
    create(dto: CreateUserDto): Promise<User>;
    update(id: number, dto: UpdateUserDto): Promise<UpdateResult>;
    delete(id: number): Promise<DeleteResult>;
    updateAvatar(id: number, avatar: string): Promise<UpdateResult>;
    mutipleDelete(ids: string[]): Promise<DeleteResult>;
}
