import { Category } from '@/modules/category/entities/category.entity';
import { CategoryService } from '@/modules/category/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from "@/modules/category/dto/update-categry.dto";
export declare class CategoryController {
    private categoryService;
    constructor(categoryService: CategoryService);
    createCategory(dto: CreateCategoryDto): Promise<Category>;
    findAll(dto: Category): Promise<any>;
    findOne(id: number): Promise<Category>;
    update(id: number, dto: UpdateCategoryDto): Promise<Category>;
    delete(id: number): Promise<void>;
}
