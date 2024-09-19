import { Module } from '@nestjs/common';
import { CategoryController } from '@/category/category.controller';
import { CategoryService } from '@/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@/category/entities/category.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from '@/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    ConfigModule,
    TypeOrmModule.forFeature([User])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
