import { Category } from '@/category/entities/category.entity';
import { CategoryService } from '@/category/category.service';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    findAll(): Promise<Category[]>;
}
