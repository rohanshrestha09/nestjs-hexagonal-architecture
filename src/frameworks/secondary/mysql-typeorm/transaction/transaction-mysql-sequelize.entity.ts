import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from 'src/core/domain/transaction/transaction.domain';
import { MySQLTypeORMUserEntity } from '../user/user-mysql-typeorm.entity';
import { TRANSACTION_STATUS } from 'src/common/enums/transaction.enum';
import { PAYMENT_PROVIDER } from 'src/common/enums/online-payment.enum';

@Entity('transaction')
export class MySQLTypeORMTransactionEntity
  extends BaseEntity
  implements Transaction
{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: TRANSACTION_STATUS.INITIATED })
  status: TRANSACTION_STATUS;

  @Column({ default: PAYMENT_PROVIDER.CASH })
  paymentProvider: PAYMENT_PROVIDER;

  @Column({ nullable: true })
  remarks: string;

  @Column({ nullable: true })
  voucherImageLink: string;

  @Column({ nullable: true })
  paymentProviderId: string;

  @Column()
  amount: number;

  @Column()
  date: Date = new Date();

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  userId: string;

  @ManyToOne(() => MySQLTypeORMUserEntity, { nullable: false })
  user: MySQLTypeORMUserEntity;
}
