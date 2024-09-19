import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateManyToOneInPostTable1726047624297 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
