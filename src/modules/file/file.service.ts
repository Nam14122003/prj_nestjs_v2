import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import {Repository} from "typeorm";
import * as XLSX from "xlsx";
import { Response } from 'express';

@Injectable()
export class FileService {
    constructor(@InjectRepository(User) private userRespository: Repository<User>) {
    }
    async exportExcel(res: Response) {
        // 1. Giả sử đây là danh sách nhân viên
        const result = [];
        const users = await this.userRespository.find({
            select: ['id', 'firstName', 'lastName', 'email', 'roles', 'status', 'createdAt', 'updatedAt', 'codeId', 'avatar', 'refresh_token']
        });
        for (const user of users) {
            if (user.roles == 'User') {
                result.push(user);
            }
        }
        // 2. Tạo một bảng tính từ danh sách nhân viên
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');

        // 3. Xuất workbook ra một buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        // 4. Gửi file excel về phía client
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'users.xlsx',
        );
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);
    }
}