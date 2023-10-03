interface OrderItem {
  orderItemId: number;
  verificationCode: string;
  isRedeemed: boolean;
  timeRedeemed: Date | null;
}
export default OrderItem;
