import Payment from "../../models/Payment";
import CustomerOrder from "../../models/CustomerOrder";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { HiOutlineCalendar, HiOutlineCloudDownload } from "react-icons/hi";
import moment from "moment-timezone";
import { PaymentStatus } from "../../enums/PaymentStatus";
import { Button } from "@/components/ui/button";

interface CustomerOrderProps {
  customerOrder: CustomerOrder;
  payments: Payment[];
}

function CustomerOrderCard(props: CustomerOrderProps) {
  function convertUtcToTimezone(utcDate: Date, targetTimezone: string): string {
    const utcMoment = moment.utc(utcDate);
    const targetMoment = utcMoment.tz(targetTimezone);
    const formattedTime: string = targetMoment.format("DD MMM YYYY");
    // const timestampWithSuffix: string = `${formattedTime} SGT`;
    // return timestampWithSuffix;
    return formattedTime;
  }
  const customerOrder = props.customerOrder;
  const payments = props.payments;
  return (
    <div className="mb-4">
      <Card className="p-3">
        <CardTitle className="text-xl">ZooVanna Ticket</CardTitle>
        <CardContent className="p-0">
          <div>
            <div className="mb-1 mt-2 font-medium">
              {customerOrder.bookingReference}
            </div>
            <div className="mb-1 flex items-center">
              <HiOutlineCalendar className="mr-1 h-[8%] w-[8%] md:h-6 md:w-6" />{" "}
              Activity Date:{" "}
              {convertUtcToTimezone(
                new Date(customerOrder.entryDate),
                "Asia/Singapore",
              )}
            </div>
            <div className="flex w-full items-center justify-between">
              <div
                className={`${
                  customerOrder.paymentStatus == PaymentStatus.COMPLETED
                    ? "text-green-500"
                    : "text-red-500"
                } font-medium`}
              >
                {customerOrder.paymentStatus}
              </div>
              <div>SGD {payments[payments.length - 1]?.amount}</div>
            </div>
            <div className="mt-3 flex items-center justify-end">
              <Button className="h-8 text-sm">View ticket(s)</Button>
              <Button className="ml-2 h-8 w-8 p-0">
                <HiOutlineCloudDownload className="m-0 h-[50%] w-[50%] p-0" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomerOrderCard;
