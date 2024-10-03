import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/modules/auth/jwt/jwt.strategy';
import {SendMailListener} from "@/modules/auth/listeners/send-mail.listener";
import {BullModule} from "@nestjs/bull";
import {SendMailProcessor} from "@/modules/auth/listeners/send-mail.processor";

@Module({
  imports: [  
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      global:true,
      secret: '123456',
      signOptions:{expiresIn:'1h'}
    }),
    ConfigModule,
    UserModule,
    BullModule.registerQueue({
      name: 'sendMailQueue',
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, SendMailListener, SendMailProcessor]
})
export class AuthModule {}
