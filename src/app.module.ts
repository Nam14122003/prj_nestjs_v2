import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptios } from 'db/data-source';
import { UserModule } from '@/user/user.module';
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PostModule } from '@/post/post.module';
import { CategoryModule } from '@/category/category.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/auth/roles.guard';
import { AuthGuard } from '@/auth/auth.guard';
import { User } from '@/user/entities/user.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptios), 
    UserModule, AuthModule, ConfigModule.forRoot(), 
    PostModule, CategoryModule, 
    TypeOrmModule.forFeature([User]),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          // ignoreTLS: true,
          // secure: false,
          auth: {
            user: process.env.MAILDEV_INCOMING_USER,
            pass: process.env.MAILDEV_INCOMING_PASS,
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
      })
      
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard  
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard  
    }
  ],
})
export class AppModule {}
