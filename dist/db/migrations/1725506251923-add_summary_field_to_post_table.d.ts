import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddSummaryFieldToPostTable1725506251923 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
