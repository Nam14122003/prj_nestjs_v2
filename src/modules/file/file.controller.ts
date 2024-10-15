import { Controller, Get, Res } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Response } from 'express';

@Controller('export')
export class ExportController {
    @Get('/excel')
    exportToExcel(@Res() res: Response) {
        // 1. Giả sử đây là danh sách nhân viên
        const employees = [
            { name: 'John Doe', email: 'john@example.com', password: '12345' },
            { name: 'Jane Smith', email: 'jane@example.com', password: '67890' },
            { name: 'Alice Johnson', email: 'alice@example.com', password: 'abcde' },
        ];

        // 2. Tạo một bảng tính từ danh sách nhân viên
        const worksheet = XLSX.utils.json_to_sheet(employees);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

        // 3. Xuất workbook ra một buffer
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        console.log(excelBuffer)
        // 4. Gửi file excel về phía client
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'employees.xlsx',
        );
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(excelBuffer);
    }
}
