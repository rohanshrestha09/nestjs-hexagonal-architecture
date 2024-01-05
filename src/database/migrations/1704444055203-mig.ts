import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1704444055203 implements MigrationInterface {
    name = 'Mig1704444055203'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`description\` longtext NOT NULL, \`price\` int NOT NULL, \`offerPrice\` int NOT NULL, \`status\` enum ('PUBLISHED', 'ARCHIVED') NOT NULL DEFAULT 'PUBLISHED', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_5cf4963ae12285cda6432d5a3a\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`course_books_book\` (\`courseId\` int NOT NULL, \`bookId\` int NOT NULL, INDEX \`IDX_7ecb77138c8a904f24972fc3c8\` (\`courseId\`), INDEX \`IDX_e49b81c9874e2e0df30bf9a397\` (\`bookId\`), PRIMARY KEY (\`courseId\`, \`bookId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_courses_course\` (\`userId\` varchar(36) NOT NULL, \`courseId\` int NOT NULL, INDEX \`IDX_e99d8f99eff1a45a772b11060e\` (\`userId\`), INDEX \`IDX_d67262674f71493825eb35e2e2\` (\`courseId\`), PRIMARY KEY (\`userId\`, \`courseId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`course_books_book\` ADD CONSTRAINT \`FK_7ecb77138c8a904f24972fc3c89\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`course_books_book\` ADD CONSTRAINT \`FK_e49b81c9874e2e0df30bf9a3977\` FOREIGN KEY (\`bookId\`) REFERENCES \`book\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` ADD CONSTRAINT \`FK_e99d8f99eff1a45a772b11060e5\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` ADD CONSTRAINT \`FK_d67262674f71493825eb35e2e2c\` FOREIGN KEY (\`courseId\`) REFERENCES \`course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` DROP FOREIGN KEY \`FK_d67262674f71493825eb35e2e2c\``);
        await queryRunner.query(`ALTER TABLE \`user_courses_course\` DROP FOREIGN KEY \`FK_e99d8f99eff1a45a772b11060e5\``);
        await queryRunner.query(`ALTER TABLE \`course_books_book\` DROP FOREIGN KEY \`FK_e49b81c9874e2e0df30bf9a3977\``);
        await queryRunner.query(`ALTER TABLE \`course_books_book\` DROP FOREIGN KEY \`FK_7ecb77138c8a904f24972fc3c89\``);
        await queryRunner.query(`DROP INDEX \`IDX_d67262674f71493825eb35e2e2\` ON \`user_courses_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_e99d8f99eff1a45a772b11060e\` ON \`user_courses_course\``);
        await queryRunner.query(`DROP TABLE \`user_courses_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_e49b81c9874e2e0df30bf9a397\` ON \`course_books_book\``);
        await queryRunner.query(`DROP INDEX \`IDX_7ecb77138c8a904f24972fc3c8\` ON \`course_books_book\``);
        await queryRunner.query(`DROP TABLE \`course_books_book\``);
        await queryRunner.query(`DROP INDEX \`IDX_5cf4963ae12285cda6432d5a3a\` ON \`course\``);
        await queryRunner.query(`DROP TABLE \`course\``);
    }

}
