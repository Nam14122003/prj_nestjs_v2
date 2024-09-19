"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateManyToOneInPostTable1726047624297 = void 0;
class UpdateManyToOneInPostTable1726047624297 {
    constructor() {
        this.name = 'UpdateManyToOneInPostTable1726047624297';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
}
exports.UpdateManyToOneInPostTable1726047624297 = UpdateManyToOneInPostTable1726047624297;
//# sourceMappingURL=1726047624297-Update_many_to_one_in_post_table.js.map