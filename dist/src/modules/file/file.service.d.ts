import { User } from '@/modules/user/entities/user.entity';
import { Repository } from "typeorm";
import { Response } from 'express';
import { AuthService } from "@/modules/auth/auth.service";
export declare class FileService {
    private userRespository;
    private readonly authService;
    constructor(userRespository: Repository<User>, authService: AuthService);
    exportExcel(res: Response): Promise<void>;
    importUsersFromExcel(filePath: string): Promise<void>;
}
