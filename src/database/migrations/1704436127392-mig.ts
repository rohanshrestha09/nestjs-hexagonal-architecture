import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1704436127392 implements MigrationInterface {
    name = 'Mig1704436127392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`author\` varchar(255) NOT NULL, \`publisher\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`offerPrice\` int NOT NULL, \`publishedDate\` datetime NOT NULL, \`edition\` varchar(255) NOT NULL, \`pages\` int NOT NULL DEFAULT '0', \`status\` enum ('PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_153910bab5ef6438fb822a0c14\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_153910bab5ef6438fb822a0c14\` ON \`book\``);
        await queryRunner.query(`DROP TABLE \`book\``);
    }

}
