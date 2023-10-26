import { PaymentType } from "../enums/PaymentType";
import { PaymentStatus } from "../enums/PaymentStatus";

interface Payment {
  paymentId: number;
  amount: number;
  paymentType: PaymentType;
  transactionId: number;
  description: string;
}

export default Payment;
