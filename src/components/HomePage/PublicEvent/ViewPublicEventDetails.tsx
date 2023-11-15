import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import * as moment from "moment-timezone";
import { FiCopy } from "react-icons/fi";
import Promotion from "../../../models/Promotion";
import PublicEvent from "../../../models/PublicEvent";
import { RecurringPattern } from "../../../enums/RecurringPattern";
import {
  convertTo12HourFormat,
  convertUtcToTimezone,
} from "../../../helpers/timeZone";

interface PublicEventDetailsProps {
  curPublicEvent: PublicEvent;
}

function ViewPublicEventDetails(props: PublicEventDetailsProps) {
  const { curPublicEvent } = props;
  console.log(curPublicEvent);
  const toastShadcn = useToast().toast;

  function addOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) {
      return day + "th";
    } else {
      switch (day % 10) {
        case 1:
          return day + "st";
        case 2:
          return day + "nd";
        case 3:
          return day + "rd";
        default:
          return day + "th";
      }
    }
  }

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
              {curPublicEvent.title}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Event Period
            </TableCell>
            <TableCell>
              {convertUtcToTimezone(curPublicEvent.startDate, "Asia/Singapore")}
              {" - "}
              {curPublicEvent.endDate
                ? convertUtcToTimezone(curPublicEvent.endDate, "Asia/Singapore")
                : "Finished"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Time:
            </TableCell>
            <TableCell>
              <div>
                {curPublicEvent.publicEventSessions?.map(
                  (publicEventSession) => {
                    return (
                      <div>
                        {publicEventSession.recurringPattern ===
                        RecurringPattern.NON_RECURRING
                          ? convertTo12HourFormat(publicEventSession.time)
                          : publicEventSession.recurringPattern ===
                            RecurringPattern.DAILY
                          ? convertTo12HourFormat(publicEventSession.time)
                          : publicEventSession.recurringPattern ===
                            RecurringPattern.MONTHLY
                          ? "Every " +
                            addOrdinalSuffix(
                              publicEventSession.dayOfMonth
                                ? publicEventSession.dayOfMonth
                                : 2,
                            ) +
                            " day of the month, " +
                            convertTo12HourFormat(publicEventSession.time)
                          : publicEventSession.recurringPattern ===
                            RecurringPattern.WEEKLY
                          ? publicEventSession.dayOfWeek != undefined &&
                            publicEventSession.dayOfWeek.charAt(0) +
                              publicEventSession.dayOfWeek
                                .substring(
                                  1,
                                  publicEventSession.dayOfWeek.length,
                                )
                                .toLowerCase() +
                              " " +
                              convertTo12HourFormat(publicEventSession.time)
                          : ""}
                      </div>
                    );
                  },
                )}
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Happening:
            </TableCell>
            <TableCell>
              {curPublicEvent.publicEventSessions
                ? curPublicEvent.publicEventSessions[0].recurringPattern ===
                  RecurringPattern.NON_RECURRING
                  ? "One Time Only"
                  : curPublicEvent.publicEventSessions[0].recurringPattern ===
                    RecurringPattern.DAILY
                  ? "Daily"
                  : curPublicEvent.publicEventSessions[0].recurringPattern ===
                    RecurringPattern.WEEKLY
                  ? "Weekly"
                  : curPublicEvent.publicEventSessions[0].recurringPattern ===
                    RecurringPattern.MONTHLY
                  ? "Monthly"
                  : ""
                : ""}
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
            <TableCell className="text-justify" colSpan={6}>
              {curPublicEvent.details}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ViewPublicEventDetails;
