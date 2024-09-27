import { Module } from '@nestjs/common';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@/modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@/jwt/jwt.strategy';

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
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
