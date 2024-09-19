import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddCodeIdAndCodeExpiredToUesrTable1726023457126 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
