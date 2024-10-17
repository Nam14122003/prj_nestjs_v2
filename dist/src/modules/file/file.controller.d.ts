/// <reference types="multer" />
import { FileService } from "@/modules/file/file.service";
import { Response } from "express";
export declare class ExportController {
    private fileService;
    constructor(fileService: FileService);
    exportToExcel(res: Response): Promise<void>;
    importUsers(file: Express.Multer.File): Promise<{
        message: string;
    }>;
}
