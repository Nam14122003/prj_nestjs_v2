import { Module } from '@nestjs/common';
import { ExportController } from '@/modules/file/file.controller'; // Đường dẫn đến file controller

@Module({
    controllers: [ExportController],
})
export class FileModule {}
