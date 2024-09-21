import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1724292613020 implements MigrationInterface {
    name = 'CreateUserTable1724292613020'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" SERIAL PRIMARY KEY,
                "firstName" VARCHAR(255) NOT NULL,
                "lastName" VARCHAR(255) NOT NULL,
                "email" VARCHAR(255) NOT NULL UNIQUE,
                "password" VARCHAR(255) NOT NULL,
                "refresh_token" TEXT,
                "avatar" TEXT,
                "status" VARCHAR(50),
                "roles" VARCHAR(100),
                "createdAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
                "codeId" VARCHAR(255),
                "codeExpired" TIMESTAMPTZ
            )
        `);

        // Add trigger to automatically update 'updatedAt' timestamp on row update
        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW."updatedAt" = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER update_user_updated_at
            BEFORE UPDATE ON "user"
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS update_user_updated_at ON "user";
            DROP FUNCTION IF EXISTS update_updated_at_column;
            DROP TABLE "user";
        `);
    }
}
