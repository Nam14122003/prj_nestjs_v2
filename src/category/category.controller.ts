import { Controller, Get, UseGuards } from '@nestjs/common';
import { Category } from '@/category/entities/category.entity';
import { CategoryService } from '@/category/category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/auth/auth.guard';
@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService){}
    @UseGuards(AuthGuard)
    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
}
