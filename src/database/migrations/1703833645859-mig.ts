import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1703833645859 implements MigrationInterface {
    name = 'Mig1703833645859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` enum ('ADMIN', 'USER') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`privilege_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_59f9343289a62aa6e1c9996aaf\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL DEFAULT 'INITIATED', \`paymentProvider\` varchar(255) NOT NULL DEFAULT 'CASH', \`remarks\` varchar(255) NULL, \`voucherImageLink\` varchar(255) NULL, \`paymentProviderId\` varchar(255) NULL, \`amount\` int NOT NULL, \`date\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(36) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_privileges_privilege_entity\` (\`userId\` varchar(36) NOT NULL, \`privilegeEntityId\` int NOT NULL, INDEX \`IDX_454ca9e11d5a0e34946c6e5a2a\` (\`userId\`), INDEX \`IDX_c644af1518c299338e1488a3bd\` (\`privilegeEntityId\`), PRIMARY KEY (\`userId\`, \`privilegeEntityId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_605baeb040ff0fae995404cea37\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege_entity\` ADD CONSTRAINT \`FK_454ca9e11d5a0e34946c6e5a2a0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege_entity\` ADD CONSTRAINT \`FK_c644af1518c299338e1488a3bdf\` FOREIGN KEY (\`privilegeEntityId\`) REFERENCES \`privilege_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege_entity\` DROP FOREIGN KEY \`FK_c644af1518c299338e1488a3bdf\``);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege_entity\` DROP FOREIGN KEY \`FK_454ca9e11d5a0e34946c6e5a2a0\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_605baeb040ff0fae995404cea37\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`DROP INDEX \`IDX_c644af1518c299338e1488a3bd\` ON \`user_privileges_privilege_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_454ca9e11d5a0e34946c6e5a2a\` ON \`user_privileges_privilege_entity\``);
        await queryRunner.query(`DROP TABLE \`user_privileges_privilege_entity\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_59f9343289a62aa6e1c9996aaf\` ON \`privilege_entity\``);
        await queryRunner.query(`DROP TABLE \`privilege_entity\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
