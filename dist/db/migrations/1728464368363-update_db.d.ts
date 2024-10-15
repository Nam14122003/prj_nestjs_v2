import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateDb1728464368363 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
