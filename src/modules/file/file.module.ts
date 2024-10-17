    import { Module } from '@nestjs/common';
    import { ExportController } from '@/modules/file/file.controller';
    import {TypeOrmModule} from "@nestjs/typeorm";
    import {User} from "@/modules/user/entities/user.entity";
    import {FileService} from "@/modules/file/file.service";
    import {AuthService} from "@/modules/auth/auth.service";
    import {ConfigModule, ConfigService} from "@nestjs/config";
    import {AuthModule} from "@/modules/auth/auth.module"; // Đường dẫn đến file controller

    @Module({
        imports: [
            TypeOrmModule.forFeature([User]),
            AuthModule,
            ConfigModule
        ],
        controllers: [ExportController],
        providers: [FileService, AuthService, ConfigService ]
    })
    export class FileModule {}
