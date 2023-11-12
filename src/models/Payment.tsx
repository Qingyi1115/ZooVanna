import { PaymentType } from "../enums/PaymentType";

interface Payment {
  paymentId: number;
  amount: number;
  paymentType: PaymentType;
  transactionId: number;
  description: string;
}

export default Payment;
