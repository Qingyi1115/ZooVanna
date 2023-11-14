import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import * as moment from "moment-timezone";
import { FiCopy } from "react-icons/fi";
import Facility from "../../models/Facility";

interface FacilityDetailsProps {
  curFacility: Facility;
}

function ViewFacilityDetails(props: FacilityDetailsProps) {
  const { curFacility } = props;
  console.log(curFacility);
  const toastShadcn = useToast().toast;

  function convertUtcToTimezone(utcDate: Date, targetTimezone: string): string {
    const utcMoment = moment.utc(utcDate);
    const targetMoment = utcMoment.tz(targetTimezone);
    const formattedTime: string = targetMoment.format("DD MMM YYYY");
    // const timestampWithSuffix: string = `${formattedTime} SGT`;
    // return timestampWithSuffix;
    return formattedTime;
  }

  const curThirdParty =
    curFacility.facilityDetail == "thirdParty"
      ? curFacility.facilityDetailJson
      : undefined;
  const curInHouse =
    curFacility.facilityDetail == "inHouse"
      ? curFacility.facilityDetailJson
      : undefined;

  return (
    <div className="border-b border-graydark/30 transition-colors">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="text-lg font-extrabold" colSpan={3}>
              {curFacility.facilityName}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="w-1/2 font-bold" colSpan={2}>
              Shelter Available
            </TableCell>
            <TableCell>
              {String(curFacility.isSheltered) == "false" ? "No" : "Yes"}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ViewFacilityDetails;
