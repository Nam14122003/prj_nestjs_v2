import { Module } from '@nestjs/common';
import { UserController } from '@/modules/user/user.controller';
import { UserService } from '@/modules/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import {CloudinaryProvider} from "@/cloudinary/cloudinary.provider";
import {CloudinaryService} from "@/cloudinary/cloudinary.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UserService, CloudinaryProvider, CloudinaryService],
})
export class UserModule {}
