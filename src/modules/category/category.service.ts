import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/base/baseService';

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(
        @InjectRepository(Category) 
        private categoryRepository: Repository<Category>,
    )
    {
        super(categoryRepository)
    }

    async actionPreCreate(dto: Category) {
        const {name, ...rest} = dto;
        const countCategory = await this.repository.countBy({ name });

        if (countCategory > 0) {
            throw new ConflictException(`Category ${name} đã tồn tại!`);
        }

        return this.actionPostCreate(dto)
    }

    async actionPostCreate(record: Category){
        return record
    }



    async findAll():Promise<Category[]> {
        return await this.categoryRepository.find();
    }
}
    