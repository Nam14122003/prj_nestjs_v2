
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/modules/user/entities/user.entity';
import {Repository} from "typeorm";
import * as XLSX from "xlsx";
import { Response } from 'express';
import {v4 as uuidv4} from "uuid";
import {authenticator, totp} from "otplib";
import {AuthService} from "@/modules/auth/auth.service";

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(User) private userRespository: Repository<User>,
        private readonly authService: AuthService
    ) {
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

    async importUsersFromExcel(filePath: string): Promise<void> {
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet);

        for (const row of data) {
            const user = new User();
            user.firstName = row['firstName'];
            user.lastName = row['lastName'];
            user.email = row['email'];
            user.password = await                                                                                                                                                                                                                                                                                                                                                                                               this.authService.hashPassword(row['password']);
            user.refresh_token = row['refresh_token'];
            user.avatar = row['avatar'];
            user.status = row['status'];
            user.roles = row['roles'];
            const tmp = uuidv4();
            authenticator.options = { digits: 6, step: 120};
            const secret = totp.generate(tmp);
            user.codeId = secret;
            user.createdAt = new Date();
            user.updatedAt = new Date();

            await this.userRespository.save(user);
        }
    }
}
