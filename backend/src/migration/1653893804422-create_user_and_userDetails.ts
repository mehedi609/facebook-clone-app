import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserAndUserDetails1653893804422 implements MigrationInterface {
    name = 'createUserAndUserDetails1653893804422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE "public"."user_details_relationship_enum" AS ENUM(
                'Single',
                'In a relationship',
                'Married',
                'Divorced'
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_details" (
                "id" SERIAL NOT NULL,
                "bio" character varying,
                "otherName" character varying,
                "job" character varying,
                "workplace" character varying,
                "high_school" character varying,
                "college" character varying,
                "currentCity" character varying,
                "hometown" character varying,
                "instagram" character varying,
                "relationship" "public"."user_details_relationship_enum",
                CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female')
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "username" character varying NOT NULL,
                "email" character varying NOT NULL,
                "password" character varying NOT NULL,
                "picture" character varying NOT NULL,
                "cover" character varying,
                "gender" "public"."users_gender_enum" NOT NULL,
                "b_year" integer NOT NULL,
                "b_month" integer NOT NULL,
                "b_day" integer NOT NULL,
                "verified" boolean NOT NULL DEFAULT false,
                CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "users"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."users_gender_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "user_details"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."user_details_relationship_enum"
        `);
    }

}
