import { MigrationInterface, QueryRunner } from 'typeorm';

export class makeNullableForPictureAndCoverColumn1653899874665
  implements MigrationInterface
{
  name = 'makeNullableForPictureAndCoverColumn1653899874665';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "picture" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "cover" DROP NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "cover"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "picture"
            SET NOT NULL
        `);
  }
}
