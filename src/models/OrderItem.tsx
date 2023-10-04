interface OrderItem {
  verificationCode: string;
  isRedeemed: boolean;
  timeRedeemed: Date | null;
}
export default OrderItem;
