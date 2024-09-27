import { Category } from '@/modules/category/entities/category.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/base/baseService';
export declare class CategoryService extends BaseService<Category> {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    actionPreCreate(dto: Category): Promise<Category>;
    actionPostCreate(record: Category): Promise<Category>;
    findAll(): Promise<Category[]>;
}
