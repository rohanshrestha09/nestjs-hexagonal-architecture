import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1704958624838 implements MigrationInterface {
    name = 'Mig1704958624838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` enum ('ADMIN', 'USER') NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_ae4578dcaed5adff96595e6166\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`privilege\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_4e876d36829a0e2bd28634a67b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`email\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NOT NULL, UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`blog\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`slug\` varchar(255) NOT NULL, \`content\` longtext NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_0dc7e58d73a1390874a663bd59\` (\`slug\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`price\` int NOT NULL, \`offerPrice\` int NOT NULL, \`status\` enum ('PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5cf4963ae12285cda6432d5a3a\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`book\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`author\` varchar(255) NOT NULL, \`publisher\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`offerPrice\` int NOT NULL, \`publishedDate\` datetime NOT NULL, \`edition\` varchar(255) NOT NULL, \`pages\` int NOT NULL DEFAULT '0', \`status\` enum ('PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_153910bab5ef6438fb822a0c14\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL DEFAULT 'INITIATED', \`paymentProvider\` varchar(255) NOT NULL DEFAULT 'CASH', \`remarks\` varchar(255) NULL, \`voucherImageLink\` varchar(255) NULL, \`paymentProviderId\` varchar(255) NULL, \`amount\` int NOT NULL, \`date\` datetime NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_privileges_privilege\` (\`userId\` varchar(36) NOT NULL, \`privilegeId\` int NOT NULL, INDEX \`IDX_0664a7ff494a1859a09014c0f1\` (\`userId\`), INDEX \`IDX_e71171f4ed20bc8564a1819d0b\` (\`privilegeId\`), PRIMARY KEY (\`userId\`, \`privilegeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_courses_course\` (\`userId\` varchar(36) NOT NULL, \`courseId\` int NOT NULL, INDEX \`IDX_e99d8f99eff1a45a772b11060e\` (\`userId\`), INDEX \`IDX_d67262674f71493825eb35e2e2\` (\`courseId\`), PRIMARY KEY (\`userId\`, \`courseId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course_books_book\` (\`courseId\` int NOT NULL, \`bookId\` int NOT NULL, INDEX \`IDX_7ecb77138c8a904f24972fc3c8\` (\`courseId\`), INDEX \`IDX_e49b81c9874e2e0df30bf9a397\` (\`bookId\`), PRIMARY KEY (\`courseId\`, \`bookId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`blog\` ADD CONSTRAINT \`FK_fc46ede0f7ab797b7ffacb5c08d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_605baeb040ff0fae995404cea37\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege\` ADD CONSTRAINT \`FK_0664a7ff494a1859a09014c0f17\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege\` ADD CONSTRAINT \`FK_e71171f4ed20bc8564a1819d0b7\` FOREIGN KEY (\`privilegeId\`) REFERENCES \`privilege\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` ADD CONSTRAINT \`FK_e99d8f99eff1a45a772b11060e5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` ADD CONSTRAINT \`FK_d67262674f71493825eb35e2e2c\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`course_books_book\` ADD CONSTRAINT \`FK_7ecb77138c8a904f24972fc3c89\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`course_books_book\` ADD CONSTRAINT \`FK_e49b81c9874e2e0df30bf9a3977\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`course_books_book\` DROP FOREIGN KEY \`FK_e49b81c9874e2e0df30bf9a3977\``);
        await queryRunner.query(`ALTER TABLE \`course_books_book\` DROP FOREIGN KEY \`FK_7ecb77138c8a904f24972fc3c89\``);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` DROP FOREIGN KEY \`FK_d67262674f71493825eb35e2e2c\``);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` DROP FOREIGN KEY \`FK_e99d8f99eff1a45a772b11060e5\``);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege\` DROP FOREIGN KEY \`FK_e71171f4ed20bc8564a1819d0b7\``);
        await queryRunner.query(`ALTER TABLE \`user_privileges_privilege\` DROP FOREIGN KEY \`FK_0664a7ff494a1859a09014c0f17\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_605baeb040ff0fae995404cea37\``);
        await queryRunner.query(`ALTER TABLE \`blog\` DROP FOREIGN KEY \`FK_fc46ede0f7ab797b7ffacb5c08d\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`DROP INDEX \`IDX_e49b81c9874e2e0df30bf9a397\` ON \`course_books_book\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ecb77138c8a904f24972fc3c8\` ON \`course_books_book\``);
        await queryRunner.query(`DROP TABLE \`course_books_book\``);
        await queryRunner.query(`DROP INDEX \`IDX_d67262674f71493825eb35e2e2\` ON \`user_courses_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_e99d8f99eff1a45a772b11060e\` ON \`user_courses_course\``);
        await queryRunner.query(`DROP TABLE \`user_courses_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_e71171f4ed20bc8564a1819d0b\` ON \`user_privileges_privilege\``);
        await queryRunner.query(`DROP INDEX \`IDX_0664a7ff494a1859a09014c0f1\` ON \`user_privileges_privilege\``);
        await queryRunner.query(`DROP TABLE \`user_privileges_privilege\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP INDEX \`IDX_153910bab5ef6438fb822a0c14\` ON \`book\``);
        await queryRunner.query(`DROP TABLE \`book\``);
        await queryRunner.query(`DROP INDEX \`IDX_5cf4963ae12285cda6432d5a3a\` ON \`course\``);
        await queryRunner.query(`DROP TABLE \`course\``);
        await queryRunner.query(`DROP INDEX \`IDX_0dc7e58d73a1390874a663bd59\` ON \`blog\``);
        await queryRunner.query(`DROP TABLE \`blog\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_4e876d36829a0e2bd28634a67b\` ON \`privilege\``);
        await queryRunner.query(`DROP TABLE \`privilege\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae4578dcaed5adff96595e6166\` ON \`role\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
