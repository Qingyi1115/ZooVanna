import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import * as moment from "moment-timezone";
import { FiCopy } from "react-icons/fi";
import Promotion from "../../../models/Promotion";
import ZooEvent from "../../../models/ZooEvent";

interface PublicEventDetailsProps {
  curPublicEvent: ZooEvent;
}

function ViewPublicEventDetails(props: PublicEventDetailsProps) {
  const { curPublicEvent } = props;
  console.log(curPublicEvent);
  const toastShadcn = useToast().toast;

  function convertUtcToTimezone(utcDate: Date, targetTimezone: string): string {
    const utcMoment = moment.utc(utcDate);
    const targetMoment = utcMoment.tz(targetTimezone);
    const formattedTime: string = targetMoment.format("DD MMM YYYY");
    // const timestampWithSuffix: string = `${formattedTime} SGT`;
    // return timestampWithSuffix;
    return formattedTime;
  }

  const endDateString = convertUtcToTimezone(
    curPublicEvent.eventEndDateTime
      ? curPublicEvent.eventEndDateTime
      : new Date(),
    "Asia/Singapore",
  );
  const startDateString = convertUtcToTimezone(
    curPublicEvent.eventStartDateTime
      ? curPublicEvent.eventStartDateTime
      : new Date(),
    "Asia/Singapore",
  );

  const combinedDate = `${startDateString} - ${endDateString}`;

  return (
    <div className="lg:flex lg:h-[90vh] lg:items-center">
      <Table>
        {/* <TableHeader className=" bg-whiten">
          <TableRow>
            <TableHead className="w-1/3 font-bold" colSpan={2}>
              Attribute
            </TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader> */}
        <TableBody>
          <TableRow>
            <TableCell className="text-lg font-extrabold" colSpan={3}>
              {curPublicEvent.eventName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Date:
            </TableCell>
            <TableCell>
              {new Date(curPublicEvent.eventStartDateTime).toDateString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Time:
            </TableCell>
            <TableCell>
              {" "}
              {new Date(curPublicEvent.eventStartDateTime).toLocaleTimeString()}
              {" - "}
              {new Date(
                curPublicEvent.eventEndDateTime
                  ? curPublicEvent.eventEndDateTime
                  : Date.now(),
              ).toLocaleTimeString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Location:
            </TableCell>
            <TableCell>
              {curPublicEvent.inHouse?.facility?.facilityName}
            </TableCell>
          </TableRow>
          {/* <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Discount &#40;%&#41;
            </TableCell>
            <TableCell>{curPromotion.percentage}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Minimum Spending &#40;$&#41;
            </TableCell>
            <TableCell>{curPromotion.description}</TableCell>
          </TableRow> */}
          {/* <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Promotion Code
            </TableCell>
            <TableCell>{curPromotion.promotionCode}</TableCell>
          </TableRow> */}

          <TableRow>
            <TableCell colSpan={4}>{curPublicEvent.eventDescription}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ViewPublicEventDetails;
