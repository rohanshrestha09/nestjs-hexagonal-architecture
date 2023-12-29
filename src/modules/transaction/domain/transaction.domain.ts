import { PAYMENT_PROVIDER } from 'src/modules/online-payment/infrastructure/enums/online-payment.enum';
import { TRANSACTION_STATUS } from '../infrastructure/enums/transaction.enum';
import { User } from 'src/modules/user/domain/user.domain';

export class Transaction {
  id: number;
  status: TRANSACTION_STATUS;
  paymentProvider: PAYMENT_PROVIDER;
  remarks: string;
  voucherImageLink: string;
  paymentProviderId: string;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;

  constructor({
    id,
    status,
    paymentProvider,
    remarks,
    voucherImageLink,
    paymentProviderId,
    amount,
    date,
    createdAt,
    updatedAt,
    user,
  }: Transaction) {
    this.id = id;
    this.status = status;
    this.paymentProvider = paymentProvider;
    this.remarks = remarks;
    this.voucherImageLink = voucherImageLink;
    this.paymentProviderId = paymentProviderId;
    this.amount = amount;
    this.date = date;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
  }
}
