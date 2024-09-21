import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateCategoryTable1724292613022 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
