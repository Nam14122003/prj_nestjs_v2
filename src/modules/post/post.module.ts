import { Module } from '@nestjs/common';
import { PostController } from '@/modules/post/post.controller';
import { PostService } from '@/modules/post/post.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post as Post1 } from '@/modules/post/entities/post.entity';
import { User } from '@/modules/user/entities/user.entity';
import {CloudinaryProvider} from "@/cloudinary/cloudinary.provider";
import {CloudinaryService} from "@/cloudinary/cloudinary.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Post1, User]),
    ConfigModule
  ],
  controllers: [PostController],
  providers: [PostService, CloudinaryProvider, CloudinaryService]
})
export class PostModule {}
