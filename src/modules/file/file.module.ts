import { Module } from '@nestjs/common';
import { ExportController } from '@/modules/file/file.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "@/modules/user/entities/user.entity";
import {FileService} from "@/modules/file/file.service"; // Đường dẫn đến file controller

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
    ],
    controllers: [ExportController],
    providers: [FileService]
})
export class FileModule {}
