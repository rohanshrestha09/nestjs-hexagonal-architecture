import {
  Table,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  UpdatedAt,
} from 'sequelize-typescript';
import { Transaction } from 'src/modules/transaction/domain/transaction.domain';
import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';
import { TRANSACTION_STATUS } from 'src/modules/transaction/infrastructure/enums/transaction.enum';
import { UserEntity } from 'src/modules/user/adapters/out/mysql-sequelize/entities/user.entity';

@Table({ tableName: 'transaction', modelName: 'transaction' })
export class TransactionEntity extends Model implements Transaction {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id: number;

  @Column({
    type: DataType.ENUM,
    values: Object.values(TRANSACTION_STATUS),
    defaultValue: TRANSACTION_STATUS.INITIATED,
    allowNull: false,
  })
  status: TRANSACTION_STATUS;

  @Column({
    type: DataType.ENUM,
    values: Object.values(PAYMENT_PROVIDER),
    defaultValue: PAYMENT_PROVIDER.CASH,
    allowNull: false,
  })
  paymentProvider: PAYMENT_PROVIDER;

  @Column({ type: DataType.STRING, allowNull: true })
  remarks: string;

  @Column({ type: DataType.STRING, allowNull: true })
  voucherImageLink: string;

  @Column({ type: DataType.STRING, allowNull: true })
  paymentProviderId: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  amount: number;

  @Column({ type: DataType.DATE, defaultValue: new Date() })
  date: Date = new Date();

  @Column({ type: DataType.DATE })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE })
  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => UserEntity, 'userId')
  user: UserEntity;
}

export default TransactionEntity;
