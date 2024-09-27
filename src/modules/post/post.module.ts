import { Module } from '@nestjs/common';
import { PostController } from '@/modules/post/post.controller';
import { PostService } from '@/modules/post/post.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '@/modules/post/entities/post.entity';
import { User } from '@/modules/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    ConfigModule
  ],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
