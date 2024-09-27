import { Category } from '@/modules/category/entities/category.entity';
import { CategoryService } from '@/modules/category/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createCategory(dto: CreateCategoryDto): Promise<Category>;
    findAll(): Promise<Category[]>;
}
