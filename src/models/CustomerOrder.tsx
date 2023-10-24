import { PaymentStatus } from "src/enums/PaymentStatus";
import { OrderStatus } from "../enums/OrderStatus";
import OrderItem from "./OrderItem";
import Payment from "./Payment";

interface CustomerOrder {
  bookingReference: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  entryDate: Date;
  customerFirstName: string;
  customerLastName: string;
  customerContactNo: string;
  customerEmail: string;
  orderItems: OrderItem[];
  payments: Payment[];
  paymentStatus: PaymentStatus;
  customerOrderId: number;
  pdfUrl: string;
}

export default CustomerOrder;
