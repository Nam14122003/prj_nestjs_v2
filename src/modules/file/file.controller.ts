import {Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {LocalAuthGuard} from "@/modules/auth/jwt/local-auth.guard";
import {Roles} from "@/modules/auth/decorator/role.decorator";
import {FileService} from "@/modules/file/file.service";
import {Response} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {extname} from "path";

@ApiTags('File')
@ApiBearerAuth()
@UseGuards(LocalAuthGuard)
@Controller('file')
export class ExportController {
    constructor(private fileService: FileService) {
    }
    @Roles('Admin')
    @Get('/excel')
    async exportToExcel(@Res() res: Response) {
        return this.fileService.exportExcel(res);
    }

    @Roles('Admin')
    @Post('/import-file')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads', // Make sure the folder exists
                filename: (req, file, cb) => {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    async importUsers(@UploadedFile() file: Express.Multer.File) {
        await this.fileService.importUsersFromExcel(file.path);
        return { message: 'File uploaded and data imported successfully' };
    }
}
