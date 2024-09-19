import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddRolesFieldToUserTable1725521442056 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
