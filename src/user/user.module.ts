import { Module } from '@nestjs/common';
import { UserController } from '@/user/user.controller';
import { UserService } from '@/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
