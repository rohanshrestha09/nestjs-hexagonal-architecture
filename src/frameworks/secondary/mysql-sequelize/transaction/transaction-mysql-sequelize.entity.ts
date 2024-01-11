import {
  Table,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Model,
  UpdatedAt,
} from 'sequelize-typescript';
import { Transaction } from 'src/core/domain/transaction/transaction.domain';
import MySQLSequelizeUserEntity from '../user/user-mysql-sequelize.entity';
import { TRANSACTION_STATUS } from 'src/common/enums/transaction.enum';
import { PAYMENT_PROVIDER } from 'src/common/enums/online-payment.enum';

@Table({ tableName: 'transaction', modelName: 'transaction' })
class MySQLSequelizeTransactionEntity extends Model implements Transaction {
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

  @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
  date: Date = new Date();

  @Column({ type: DataType.DATE, allowNull: false })
  @CreatedAt
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  @UpdatedAt
  updatedAt: Date;

  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => MySQLSequelizeUserEntity, 'userId')
  user: MySQLSequelizeUserEntity;
}

export default MySQLSequelizeTransactionEntity;
