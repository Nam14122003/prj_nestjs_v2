import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUserTable1724292613020 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
