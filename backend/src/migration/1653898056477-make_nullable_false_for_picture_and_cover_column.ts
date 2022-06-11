import { MigrationInterface, QueryRunner } from "typeorm";

export class makeNullableFalseForPictureAndCoverColumn1653898056477 implements MigrationInterface {
    name = 'makeNullableFalseForPictureAndCoverColumn1653898056477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "cover"
            SET NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "cover" DROP NOT NULL
        `);
    }

}
