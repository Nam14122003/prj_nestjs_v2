import {Controller, Get, Res, UseGuards} from '@nestjs/common';
import {ApiBearerAuth} from "@nestjs/swagger";
import {LocalAuthGuard} from "@/modules/auth/jwt/local-auth.guard";
import {Roles} from "@/modules/auth/decorator/role.decorator";
import {FileService} from "@/modules/file/file.service";
import {Response} from "express";

@ApiBearerAuth()
@UseGuards(LocalAuthGuard)
@Controller('export')
export class ExportController {
    constructor(private fileService: FileService) {
    }

    @Roles('Admin')
    @Get('/excel')
    async exportToExcel(@Res() res: Response) {
        return this.fileService.exportExcel(res);
    }
}
