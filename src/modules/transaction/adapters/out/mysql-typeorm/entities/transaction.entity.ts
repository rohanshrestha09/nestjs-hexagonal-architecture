import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from 'src/modules/transaction/domain/transaction.domain';
import { TRANSACTION_STATUS } from 'src/modules/transaction/infrastructure/enums/transaction.enum';
import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';
import { UserEntity } from 'src/modules/user/adapters/out/mysql-typeorm/entities/user.entity';

@Entity('transaction')
export class TransactionEntity extends BaseEntity implements Transaction {
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

  @ManyToOne(() => UserEntity, { nullable: false })
  user: UserEntity;
}
