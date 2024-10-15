import { Response } from 'express';
import { User } from "@/modules/user/entities/user.entity";
import { Repository } from "typeorm";
export declare class ExportController {
    private userRespository;
    constructor(userRespository: Repository<User>);
    exportToExcel(res: Response): Promise<void>;
}
