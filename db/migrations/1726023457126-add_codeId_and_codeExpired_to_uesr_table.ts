import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCodeIdAndCodeExpiredToUesrTable1726023457126 implements MigrationInterface {
    name = 'AddCodeIdAndCodeExpiredToUesrTable1726023457126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`codeExpỉed\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`codeExpỉed\``);
    }

}
