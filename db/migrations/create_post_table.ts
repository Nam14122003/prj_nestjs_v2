import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePostTable1724292613021 implements MigrationInterface {
    name = 'CreatePostTable1724292613021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "post" (
                "id" SERIAL PRIMARY KEY,
                "title" VARCHAR(255) NOT NULL,
                "summary" TEXT NULL,
                "description" TEXT NOT NULL,
                "thumbnail" TEXT NULL,
                "status" VARCHAR(50) NULL,
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "userId" int NOT NULL,
                "categoryId" int NULL,
                CONSTRAINT "FK_user_post" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE
            )
        `);

        // Add trigger to automatically update 'updatedAt' timestamp on row update
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_post_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW."updatedAt" = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER update_post_updated_at
            BEFORE UPDATE ON "post"
            FOR EACH ROW
            EXECUTE FUNCTION update_post_updated_at_column();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS update_post_updated_at ON "post";
            DROP FUNCTION IF EXISTS update_post_updated_at_column;
            DROP TABLE "post";
        `);
    }
}
