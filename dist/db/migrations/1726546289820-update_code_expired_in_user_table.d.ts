import { MigrationInterface, QueryRunner } from "typeorm";
export declare class UpdateCodeExpiredInUserTable1726546289820 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
