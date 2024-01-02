import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1704174029236 implements MigrationInterface {
    name = 'Mig1704174029236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`privilege\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4e876d36829a0e2bd28634a67b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_privileges_privilege\` (\`userId\` varchar(36) NOT NULL, \`privilegeId\` int NOT NULL, INDEX \`IDX_0664a7ff494a1859a09014c0f1\` (\`userId\`), INDEX \`IDX_e71171f4ed20bc8564a1819d0b\` (\`privilegeId\`), PRIMARY KEY (\`userId\`, \`privilegeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_605baeb040ff0fae995404cea37\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_605baeb040ff0fae995404cea37\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege\` ADD CONSTRAINT \`FK_0664a7ff494a1859a09014c0f17\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege\` ADD CONSTRAINT \`FK_e71171f4ed20bc8564a1819d0b7\` FOREIGN KEY (\`privilegeId\`) REFERENCES \`privilege\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege\` DROP FOREIGN KEY \`FK_e71171f4ed20bc8564a1819d0b7\``);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege\` DROP FOREIGN KEY \`FK_0664a7ff494a1859a09014c0f17\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_605baeb040ff0fae995404cea37\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD \`userId\` varchar(36) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_605baeb040ff0fae995404cea37\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_e71171f4ed20bc8564a1819d0b\` ON \`user_privileges_privilege\``);
        await queryRunner.query(`DROP INDEX \`IDX_0664a7ff494a1859a09014c0f1\` ON \`user_privileges_privilege\``);
        await queryRunner.query(`DROP TABLE \`user_privileges_privilege\``);
        await queryRunner.query(`DROP INDEX \`IDX_4e876d36829a0e2bd28634a67b\` ON \`privilege\``);
        await queryRunner.query(`DROP TABLE \`privilege\``);
    }

}
