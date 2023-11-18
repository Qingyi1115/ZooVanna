import { useEffect, useState } from "react";
import { FaChevronLeft, FaLightbulb } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";
import { Button } from "@/components/ui/button";

import ViewFacilityDetails from "../../components/Map/ViewFacilityDetails";
import ViewThirdPartyDetails from "../../components/Map/ViewThirdPartyDetails";
import ViewInHouseDetails from "../../components/Map/ViewInHouseDetails";
import { Separator } from "@radix-ui/react-separator";

import { MdMan } from "react-icons/md";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import beautifyText from "../../hooks/beautifyText";

function ViewFacilityDetailsPage() {
  const apiJson = useApiJson();

  let emptyFacility: Facility = {
    facilityId: -1,
    facilityName: "",
    imageUrl: "",
    xCoordinate: 0,
    yCoordinate: 0,
    isSheltered: false,
    showOnMap: false,
    facilityDetail: "",
    facilityDetailJson: null,
  };

  const { facilityId } = useParams<{ facilityId: string }>();
  const [curFacility, setCurFacility] = useState<Facility>(emptyFacility);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);
  const [crowdLevel, setCrowdLevel] = useState<string>("");

  const curThirdParty =
    curFacility.facilityDetail == "thirdParty"
      ? curFacility.facilityDetailJson
      : undefined;
  const curInHouse =
    curFacility.facilityDetail == "inHouse"
      ? curFacility.facilityDetailJson
      : undefined;

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const responseJson = await apiJson.post(
          `http://${localhost_address}/api/assetFacility/getFacilityCustomer/${facilityId}`,
          { includes: ["facilityDetail"] },
        );
        setCurFacility(responseJson.facility as Facility);

        const responseJson2 = await apiJson.get(
          `http://${localhost_address}/api/assetFacility/crowdLevelByFacilityId/${facilityId}`,
        );
        setCrowdLevel(responseJson2.crowdLevel);
        console.log(responseJson2);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchFacility();
  }, []);

  const getColor = (index: number) => {
    switch (crowdLevel) {
      case "LOW":
        return index === 0 ? "text-green-600" : "text-black";
      case "MEDIUM":
        return index < 2 ? "text-yellow-600" : "text-black";
      case "HIGH":
        return "text-red-700";
      default:
        return "text-black";
    }
  };

  return (
    <div>
      {curFacility.facilityId !== -1 && (
        <div className="flex h-screen flex-col lg:flex-row">
          <div className="relative lg:w-1/2">
            <img
              src={`http://${localhost_address}/` + curFacility.imageUrl}
              alt="Current facility image"
              className={`mx-auto w-full max-w-full object-cover lg:mx-0 ${
                window.innerWidth >= 1024
                  ? "pl-20 pt-4 lg:rounded-bl-xl lg:rounded-tl-xl"
                  : ""
              }`}
            />
            <NavLink to={`/map`} className="absolute left-4 top-4">
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
                <FaChevronLeft />
              </button>
            </NavLink>
          </div>

          <div className="flex flex-col p-6 lg:w-1/2">
            <ViewFacilityDetails
              curFacility={curFacility}
              crowdLevel={crowdLevel}
            />
            <span></span>
            {curFacility.facilityDetail == "thirdParty" && (
              <ViewThirdPartyDetails
                curThirdParty={curThirdParty}
              ></ViewThirdPartyDetails>
            )}
            {curFacility.facilityDetail == "inHouse" && (
              <ViewInHouseDetails curInHouse={curInHouse}></ViewInHouseDetails>
            )}
            <Card className="pt-2 mt-2">
              <CardHeader className="text-m pb-3 pt-3 font-bold">
                <div className="flex">
                  <p className="ml-2">Live Crowd Level Information</p>
                </div>
              </CardHeader>
              <CardContent className="ml-2">
                <div className="flex items-center">
                  {[...Array(3)].map((_, index) => (
                    <MdMan
                      key={index}
                      className={`h-8 w-8 ${getColor(index)}`}
                    />
                  ))}
                  <div className="text-md pl-5 font-semibold">
                    {beautifyText(crowdLevel)}
                  </div>
                </div>
                <div className="pt-3 text-sm">
                  {crowdLevel === "LOW" &&
                    "Great news! It's a calm and quiet day here. Enjoy the peace and space!"}
                  {crowdLevel === "MEDIUM" &&
                    "It's getting a bit lively! There's a moderate crowd, but there's still room for you."}
                  {crowdLevel === "HIGH" &&
                    "Heads up! It's quite crowded at the moment. For a more comfortable visit, consider dropping by later."}
                </div>
              </CardContent>
            </Card>
            <div className="flex px-4 py-10 ">
              <p>Anything broken?</p>
              <NavLink
                to={`/facility/reportFaultyFacility/${curFacility.facilityId}`}
              >
                <Button variant={"outline"} className="ml-3 h-7 w-full px-2">
                  Report faulty facility
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewFacilityDetailsPage;
