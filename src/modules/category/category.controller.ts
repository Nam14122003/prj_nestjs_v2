import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Category } from '@/modules/category/entities/category.entity';
import { CategoryService } from '@/modules/category/category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/modules/auth/auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Post('/create')
    async createCategory(@Body() dto: CreateCategoryDto): Promise<Category>{
        return this.categoryService.create(dto);
    }

    @UseGuards(AuthGuard)
    @Get()
    findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }
}
