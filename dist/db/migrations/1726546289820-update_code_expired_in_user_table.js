"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCodeExpiredInUserTable1726546289820 = void 0;
class UpdateCodeExpiredInUserTable1726546289820 {
    constructor() {
        this.name = 'UpdateCodeExpiredInUserTable1726546289820';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`summary\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`thumbnail\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`categoryId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`refresh_token\` varchar(255) NULL, \`avatar\` varchar(255) NULL, \`status\` int NOT NULL, \`roles\` varchar(255) NOT NULL DEFAULT 'User', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`codeId\` varchar(255) NOT NULL, \`codeExpired\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_5c1cf55c308037b5aca1038a131\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_1077d47e0112cad3c16bbcea6cd\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_1077d47e0112cad3c16bbcea6cd\``);
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_5c1cf55c308037b5aca1038a131\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`post\``);
    }
}
exports.UpdateCodeExpiredInUserTable1726546289820 = UpdateCodeExpiredInUserTable1726546289820;
//# sourceMappingURL=1726546289820-update_code_expired_in_user_table.js.map