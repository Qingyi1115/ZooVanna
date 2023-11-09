import {
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import * as moment from "moment-timezone";
import { FiCopy } from "react-icons/fi";
import Promotion from "../../../models/Promotion";

interface PromotionDetailsProps {
  curPromotion: Promotion;
}

function ViewPromotionDetails(props: PromotionDetailsProps) {
  const { curPromotion } = props;
  const toastShadcn = useToast().toast;

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // Use shadcn to display a toast message
        toastShadcn({
          title: "Copied to Clipboard",
          description: "Promotion code copied to clipboard",
        });
      })
      .catch((error) => {
        console.error("Failed to copy promotion code: ", error);
      });
  };

  function convertUtcToTimezone(utcDate: Date, targetTimezone: string): string {
    const utcMoment = moment.utc(utcDate);
    const targetMoment = utcMoment.tz(targetTimezone);
    const formattedTime: string = targetMoment.format("DD MMM YYYY");
    // const timestampWithSuffix: string = `${formattedTime} SGT`;
    // return timestampWithSuffix;
    return formattedTime;
  }

  const endDateString = convertUtcToTimezone(
    curPromotion.endDate,
    "Asia/Singapore",
  );
  const startDateString = convertUtcToTimezone(
    curPromotion.startDate,
    "Asia/Singapore",
  );

  const combinedDate = `${startDateString} - ${endDateString}`;

  return (
    <div className="">
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
              {curPromotion.title}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Validity Period
            </TableCell>
            <TableCell>{combinedDate}</TableCell>
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
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Promotion Code
            </TableCell>
            <TableCell className="relative">
              {curPromotion.promotionCode}
              <button
                className="hover:bg-gray-900 absolute right-0 top-1/2 -translate-y-1/2 transform rounded-md bg-black px-2 py-1 text-sm text-white"
                onClick={() =>
                  handleCopyToClipboard(curPromotion.promotionCode)
                }
              >
                <FiCopy size={20} />
              </button>
            </TableCell>
          </TableRow>

          <TableRow>
            {/* <TableCell className="w-1/3 font-bold" colSpan={2}>
              Description
            </TableCell> */}
            <TableCell colSpan={3}>{curPromotion.description}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ViewPromotionDetails;
