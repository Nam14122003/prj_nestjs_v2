import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreatePostTable1724292613021 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
