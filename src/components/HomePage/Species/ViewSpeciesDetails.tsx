import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import * as moment from "moment-timezone";
import { FiCopy } from "react-icons/fi";
import Species from "../../../models/Species";
import beautifyText from "../../../hooks/beautifyText";
import { FaStop, FaLightbulb } from "react-icons/fa";
import { useSpeechSynthesis } from "react-speech-kit";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import useApiJson from "../../../hooks/useApiJson";

interface SpeciesDetailsProps {
  curSpecies: Species;
  loved: boolean;
  refreshSeed: number;
  setRefreshSeed: any;
  changeHeart: any;
}

function ViewSpeciesDetails(props: SpeciesDetailsProps) {
  const { curSpecies, loved, refreshSeed, setRefreshSeed, changeHeart } = props;
  const { state } = useAuthContext();
  const { user } = state;
  console.log(curSpecies);
  const toastShadcn = useToast().toast;
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  {
    /*useEffect(() => {
    apiJson
      .get(
        `http://${localhost_address}/api/species/isThisLovedByCustomer/${curSpecies.speciesCode}`,
      )
      .catch((error) => console.log(error))
      .then((result) => {
        setLoved(result.result as boolean);
        console.log(result.result);
      });
  }, []);*/
  }

  const { speak, cancel, speaking } = useSpeechSynthesis();

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
          <TableRow className="p-0">
            <TableCell className="h-full items-center ">
              <div className="text-lg font-extrabold">
                {curSpecies.commonName}
              </div>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="">
              {user ? (
                loved ? (
                  <FaHeart className=" h-8 w-8" onClick={() => changeHeart()} />
                ) : (
                  <FaRegHeart
                    className="h-8 w-8"
                    onClick={() => changeHeart()}
                  />
                )
              ) : (
                ""
              )}
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
      <span className="flex">
        <p className="text-m px-4 font-extrabold">Animal Insights</p>
        <button
          className="btn btn-m rounded-full bg-black px-4 py-1 text-xs text-whiter"
          onClick={() =>
            speaking
              ? cancel()
              : speak({ text: curSpecies.educationalDescription })
          }
        >
          {speaking ? <FaStop /> : <HiSpeakerWave />}
        </button>
      </span>
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
