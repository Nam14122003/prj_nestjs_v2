import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { DeleteResult, In, Like, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '@/modules/user/dto/update-user.dto';
import { FillterUserDto } from '@/modules/user/dto/fillter-user.dto';


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRespository: Repository<User>){}
    async findAll(query: FillterUserDto):Promise<any> {
        const itemsPerPage= Number(query.itemsPerPage) || 10;
        const keyword = query.search || '';
        const page = Number(query.page) || 1;
        const skip = (page - 1) * itemsPerPage;
        const[res, total] = await this.userRespository.findAndCount({
            where: [
                {firstName: Like('%' + keyword + '%')},
                {lastName: Like('%' + keyword + '%')},
                {email: Like('%' + keyword + '%')},
            ],
            order: {createdAt: "DESC"},
            take: itemsPerPage,
            skip: skip,

            select: ['id', 'firstName', 'lastName', 'email', 'status', 'createdAt', 'updatedAt']
        })
        const lastPage = Math.ceil(total/itemsPerPage);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;
        return {
            data: res,
            total,
            currentPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }

    async findOne(id: number): Promise<User> {
        return await this.userRespository.findOneBy({id});
    }

    async create(dto: CreateUserDto): Promise<User> {
        const hashPassword = await bcrypt.hash(dto.password, 10);

        return await this.userRespository.save(dto);
    }

    async update(id:number, dto: UpdateUserDto):Promise<UpdateResult> {
        return await this.userRespository.update(id, dto);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.userRespository.delete(id);
    }
    
    async updateAvatar(id:number, avatar: string):Promise<UpdateResult> {
        return await this.userRespository.update(id, {avatar});
    }

    async mutipleDelete(ids: string[]):Promise<DeleteResult> {
        return await this.userRespository.delete({ id: In(ids)});
    }
}
