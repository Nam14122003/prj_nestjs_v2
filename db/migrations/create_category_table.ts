import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategoryTable1724292613022 implements MigrationInterface {
    name = 'CreateCategoryTable1724292613022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "category" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "description" TEXT NULL,
                "status" INT NOT NULL,
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Insert initial data
        await queryRunner.query(`
            INSERT INTO "category" ("name", "description", "status", "createdAt", "updatedAt") 
            VALUES 
            ('PHP', 'PHP Language', 1, NOW(), NOW()),
            ('Javascript', 'Javascript', 1, NOW(), NOW()),
            ('HTML', 'HTML', 1, NOW(), NOW());
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "category CASCDE"`);
    }
}
