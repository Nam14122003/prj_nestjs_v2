import {HttpException, HttpStatus, Injectable, UploadedFiles} from '@nestjs/common';
import { CreatePostDto } from '@/modules/post/dto/create-post.dto';
import { Post } from '@/modules/post/entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Like, Repository, UpdateResult } from 'typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { FilterPostDto } from '@/modules/post/dto/filter-post.dto';
import { UpdatePostDto } from '@/modules/post/dto/update-post.dto';



@Injectable()
export class PostService {
    constructor(
        @InjectRepository(User) private useRepository: Repository<User>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
    ){}
    async create(userId: number, dto: CreatePostDto): Promise<Post> {
      const user = await this.useRepository.findOneBy({id: userId});
      
      try {
        const res = await this.postRepository.save({
            ...dto, user
        })

        return await this.postRepository.findOneBy({id: res.id})
      }
      catch(error) {
        console.log(error);
        throw new HttpException('Cannot create post', HttpStatus.BAD_REQUEST)
      }
    }

    async findAll(query: FilterPostDto):Promise<any> {
        const itemPerPage = Number(query.itemPerPage) || 10;
        const page = Number(query.page) || 1;
        const search = query.search || '';
        const category = Number(query.category) || null;

        const skip = (page - 1) * itemPerPage;
        const[res, total] = await this.postRepository.findAndCount({
            where: [
                {
                    title: Like('%' + search + '%'),
                    category: {
                        id: category
                    }
                },
                {
                    description: Like('%' + search + '%'),
                    category: {
                        id: category
                    }
                }   
            ],
            order: {createdAt: 'DESC'},
            take: itemPerPage, 
            skip: skip,
            relations: {
                user: true,
                category: true
            },
            select: {
                category: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true, 
                    avatar: true
                }             
            }
        })

        const lastPage = Math.ceil(total/itemPerPage);
        const nextPage = page + 1 > lastPage ? null : page + 1;
        const prevPage = page - 1 < 1 ? null : page - 1;

        return {
            data: res,
            total,
            currenPage: page,
            nextPage,
            prevPage,
            lastPage
        }
    }

    async findDetail(id: number): Promise<Post> {
        return await this.postRepository.findOne({
            where: {id},
            relations: ['user', 'category'],
            select: {
                category: {
                    id: true,
                    name: true
                },
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    avatar: true
                }
            }
        })
    }

    async update(id: number, dto: UpdatePostDto): Promise<UpdateResult> {
        return await this.postRepository.update(id, dto)
    }

    async delete(id : number): Promise<DeleteResult> {
        return await this.postRepository.delete(id);
    }
}
