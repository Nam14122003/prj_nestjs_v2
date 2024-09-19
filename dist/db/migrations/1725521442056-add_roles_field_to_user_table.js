"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddRolesFieldToUserTable1725521442056 = void 0;
class AddRolesFieldToUserTable1725521442056 {
    constructor() {
        this.name = 'AddRolesFieldToUserTable1725521442056';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`roles\` varchar(255) NOT NULL DEFAULT 'User'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roles\``);
    }
}
exports.AddRolesFieldToUserTable1725521442056 = AddRolesFieldToUserTable1725521442056;
//# sourceMappingURL=1725521442056-add_roles_field_to_user_table.js.map