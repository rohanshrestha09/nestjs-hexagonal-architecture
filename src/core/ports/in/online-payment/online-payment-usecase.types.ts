export type EsewaPaymentDto = {
  amount: number;
  transactionId: string;
};

export type EsewaTransactionVerificationDto = {
  encodedData: string;
  refId: string;
};

export type KhaltiPaymentDto = {
  amount: number;
  transactionId: string;
  purchaseOrderName: string;
};

export type KhaltiTransactionVerificationDto = {
  pidx: string;
  token: string;
};

export type TransactionDto = {
  id: number;
  amount: number;
};
