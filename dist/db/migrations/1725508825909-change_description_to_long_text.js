"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeDescriptionToLongText1725508825909 = void 0;
class ChangeDescriptionToLongText1725508825909 {
    constructor() {
        this.name = 'ChangeDescriptionToLongText1725508825909';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`description\` longtext NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`description\` varchar(255) NOT NULL`);
    }
}
exports.ChangeDescriptionToLongText1725508825909 = ChangeDescriptionToLongText1725508825909;
//# sourceMappingURL=1725508825909-change_description_to_long_text.js.map