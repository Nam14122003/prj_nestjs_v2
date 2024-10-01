import { Category } from '@/modules/category/entities/category.entity';
import { Repository } from 'typeorm';
import { BaseService } from '@/base/base.service';
export declare class CategoryService extends BaseService<Category> {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    actionPreCreate(dto: Category): Promise<Category>;
    actionPostDelete(): Promise<void>;
}
