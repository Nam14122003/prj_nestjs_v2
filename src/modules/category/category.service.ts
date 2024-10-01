import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/base/base.service';

@Injectable()
export class CategoryService extends BaseService<Category> {
    constructor(
        @InjectRepository(Category) 
        private categoryRepository: Repository<Category>
    )
    {
        super(categoryRepository)
    }

    async actionPreCreate(dto: Category) {
        const {name, ...rest} = dto;
        const countCategory = await this.repository.countBy({name});

        if (countCategory > 0) {
            throw new ConflictException(`Category ${name} đã tồn tại!`);
        }
        return this.actionPostCreate(dto)
    }

    async actionPostDelete() {
        return postMessage(`Đã xóa category ${Category.name} thành công!`);
    }
}