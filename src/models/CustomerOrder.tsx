import { OrderStatus } from "../enums/OrderStatus";

interface CustomerOrder {
  bookingReference: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  entryDate: Date;
  customerFirstName: string;
  customerLastName: string;
  customerContactNo: string;
  customerEmail: string;
}

export default CustomerOrder;
