"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCodeIdAndCodeExpiredToUesrTable1726023457126 = void 0;
class AddCodeIdAndCodeExpiredToUesrTable1726023457126 {
    constructor() {
        this.name = 'AddCodeIdAndCodeExpiredToUesrTable1726023457126';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`codeExpỉed\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`codeExpỉed\``);
    }
}
exports.AddCodeIdAndCodeExpiredToUesrTable1726023457126 = AddCodeIdAndCodeExpiredToUesrTable1726023457126;
//# sourceMappingURL=1726023457126-add_codeId_and_codeExpired_to_uesr_table.js.map