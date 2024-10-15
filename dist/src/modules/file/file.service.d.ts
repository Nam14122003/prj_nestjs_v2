import { User } from '@/modules/user/entities/user.entity';
import { Repository } from "typeorm";
import { Response } from 'express';
export declare class FileService {
    private userRespository;
    constructor(userRespository: Repository<User>);
    exportExcel(res: Response): Promise<void>;
}
