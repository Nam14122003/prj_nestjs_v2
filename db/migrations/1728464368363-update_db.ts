import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateDb1728464368363 implements MigrationInterface {
    name = 'UpdateDb1728464368363'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "summary"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "summary" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "thumbnail"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "thumbnail" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refresh_token" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" character varying(100) NOT NULL DEFAULT 'User'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "codeId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "codeId" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "codeId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "codeId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roles"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "roles" character varying NOT NULL DEFAULT 'User'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "avatar"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "avatar" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "refresh_token"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "refresh_token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "thumbnail"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "thumbnail" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "summary"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "summary" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "post" ADD "title" character varying NOT NULL`);
    }

}
