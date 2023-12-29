import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1703836172587 implements MigrationInterface {
    name = 'Mig1703836172587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`privilege_entity\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`privilege_entity\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`privilege_entity\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`privilege_entity\` DROP COLUMN \`createdAt\``);
    }

}
