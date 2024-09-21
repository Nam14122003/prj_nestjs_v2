"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryTable1724292613022 = void 0;
class CreateCategoryTable1724292613022 {
    constructor() {
        this.name = 'CreateCategoryTable1724292613022';
    }
    async up(queryRunner) {
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
        await queryRunner.query(`
            INSERT INTO "category" ("name", "description", "status", "createdAt", "updatedAt") 
            VALUES 
            ('PHP', 'PHP Language', 1, NOW(), NOW()),
            ('Javascript', 'Javascript', 1, NOW(), NOW()),
            ('HTML', 'HTML', 1, NOW(), NOW());
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "category CASCDE"`);
    }
}
exports.CreateCategoryTable1724292613022 = CreateCategoryTable1724292613022;
//# sourceMappingURL=create_category_table.js.map