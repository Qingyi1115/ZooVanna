import { useToast } from "@/components/ui/use-toast";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import InHouse from "src/models/InHouse";
import beautifyText from "../../hooks/beautifyText";

interface InHouseDetailsProps {
  curInHouse: InHouse;
}
function ViewInHouseDetails(props: InHouseDetailsProps) {
  const { curInHouse } = props;

  const toastShadcn = useToast().toast;

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
          {/* <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Maximum Accommodation Size
            </TableCell>
            <TableCell>{curInHouse.maxAccommodationSize}</TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell className="w-1/2 font-bold" colSpan={2}>
              Air Condition Available
            </TableCell>
            <TableCell>
              {String(curInHouse.hasAirCon) == "false" ? "No" : "Yes"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/2 font-bold" colSpan={2}>
              Facility Type
            </TableCell>
            <TableCell>{beautifyText(curInHouse.facilityType)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ViewInHouseDetails;
