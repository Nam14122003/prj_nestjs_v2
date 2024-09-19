import { Module } from '@nestjs/common';
import { PostController } from '@/post/post.controller';
import { PostService } from '@/post/post.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/post/entities/post.entity';
import { User } from '@/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    ConfigModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
