import { Module } from '@nestjs/common';
import { CategoryController } from '@/modules/category/category.controller';
import { CategoryService } from '@//modules/category/category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@/modules/category/entities/category.entity';
import { ConfigModule } from '@nestjs/config';
import { User } from '@/modules/user/entities/user.entity';

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
