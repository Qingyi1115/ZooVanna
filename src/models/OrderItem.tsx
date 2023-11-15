interface OrderItem {
  verificationCode: string;
  isRedeemed: number;
  timeRedeemed: Date | null;
}
export default OrderItem;
