"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddSummaryFieldToPostTable1725506251923 = void 0;
class AddSummaryFieldToPostTable1725506251923 {
    constructor() {
        this.name = 'AddSummaryFieldToPostTable1725506251923';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`post\` ADD \`summary\` varchar(255) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`post\` DROP COLUMN \`summary\``);
    }
}
exports.AddSummaryFieldToPostTable1725506251923 = AddSummaryFieldToPostTable1725506251923;
//# sourceMappingURL=1725506251923-add_summary_field_to_post_table.js.map