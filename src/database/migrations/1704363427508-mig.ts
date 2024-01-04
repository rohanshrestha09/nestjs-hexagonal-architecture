import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1704363427508 implements MigrationInterface {
    name = 'Mig1704363427508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`blog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`content\` longtext NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0dc7e58d73a1390874a663bd59\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD CONSTRAINT \`FK_fc46ede0f7ab797b7ffacb5c08d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_fc46ede0f7ab797b7ffacb5c08d\``);
        await queryRunner.query(`DROP INDEX \`IDX_0dc7e58d73a1390874a663bd59\` ON \`blog\``);
        await queryRunner.query(`DROP TABLE \`blog\``);
    }

}
