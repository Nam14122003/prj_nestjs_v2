import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import { Category } from '@/modules/category/entities/category.entity';
import { CategoryService } from '@/modules/category/category.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@/modules/auth/jwt/auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';
import {UpdateCategoryDto} from "@/modules/category/dto/update-categry.dto";
@ApiBearerAuth()
@ApiTags('Categories')
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Post('/create')
    async createCategory(@Body() dto: CreateCategoryDto): Promise<Category>{
        return this.categoryService.create(dto);
    }

    @Get()
    findAll(dto: Category): Promise<any> {
        return this.categoryService.getList(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Category> {
        return this.categoryService.getDetail(id);
    }

    @Patch(':id')
    update(@Param('id') id : number,@Body() dto: UpdateCategoryDto): Promise<Category> {
        return this.categoryService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.categoryService.delete(id);
    }
}
