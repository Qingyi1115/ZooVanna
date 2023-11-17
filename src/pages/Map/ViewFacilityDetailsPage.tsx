import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";
import { Button } from "@/components/ui/button";

import ViewFacilityDetails from "../../components/Map/ViewFacilityDetails";
import ViewThirdPartyDetails from "../../components/Map/ViewThirdPartyDetails";
import ViewInHouseDetails from "../../components/Map/ViewInHouseDetails";
import { Separator } from "@radix-ui/react-separator";

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
            <div className="flex px-4 py-15 ">
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
