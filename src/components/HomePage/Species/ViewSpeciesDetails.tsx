import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import * as moment from "moment-timezone";
import { FiCopy } from "react-icons/fi";
import Species from "../../../models/Species";
import beautifyText from "../../../hooks/beautifyText";
import { FaLightbulb } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SpeciesDetailsProps {
  curSpecies: Species;
}

function ViewSpeciesDetails(props: SpeciesDetailsProps) {
  const { curSpecies } = props;
  console.log(curSpecies);
  const toastShadcn = useToast().toast;

  return (
    <div className="">
      <Table className="mb-5">
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
              {curSpecies.commonName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Scientific Name
            </TableCell>
            <TableCell className="italic">
              {curSpecies.scientificName}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Conservation Status
            </TableCell>
            <TableCell className="relative">
              {beautifyText(curSpecies.conservationStatus)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="w-1/3 font-bold" colSpan={2}>
              Native Continent
            </TableCell>
            <TableCell>{beautifyText(curSpecies.nativeContinent)}</TableCell>
          </TableRow>

          {/* <TableRow>
            <TableCell colSpan={3}>
              {curSpecies.educationalDescription}
            </TableCell>
          </TableRow> */}
        </TableBody>
      </Table>
      <span className="text-m px-4 font-extrabold">Animal Insights</span>
      <p className="text-s mb-4 mt-2 px-4">
        {curSpecies.educationalDescription}
      </p>
      <Card className="">
        <CardHeader className="text-m pb-3 font-bold">
          <div className="flex">
            <FaLightbulb className="h-5 text-yellow-500" />
            <p className="ml-2">Did you know?</p>
          </div>
        </CardHeader>
        <CardContent className="ml-2">
          {curSpecies.educationalFunFact}
        </CardContent>
      </Card>

      {/* <Card className="bg-black">
        <CardHeader className="text-m font-extrabold text-white">
          Did you know?
        </CardHeader>
        <CardContent className="text-white">
          {curSpecies.educationalFunFact}
        </CardContent>
      </Card> */}
    </div>
  );
}

export default ViewSpeciesDetails;
