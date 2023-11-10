import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";

import ViewFacilityDetails from "../../components/Map/ViewFacilityDetails";

function ViewFacilityDetailsPage() {
  const apiJson = useApiJson();

  let emptyFacility: Facility = {
    facilityId: -1,
    facilityName: "",
    imageUrl: "",
    xCoordinate: 0,
    yCoordinate: 0,
    facilityDetail: "",
    facilityDetailJson: undefined,
    isSheltered: false,
    showOnMap: false
  };

  const { facilityId } = useParams<{ facilityId: string }>();
  const [curFacility, setCurFacility] = useState<Facility>(emptyFacility);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchFacility = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/facility/getFacility/${facilityId}`,
        );
        setCurFacility(responseJson as Facility);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchFacility();
  }, [refreshSeed]);

  return (
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
        <NavLink to={`/`} className="absolute left-4 top-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
            <FaChevronLeft />
          </button>
        </NavLink>
      </div>

      <div className="flex flex-col p-6 lg:w-1/2">
        <ViewFacilityDetails curFacility={curFacility} />
      </div>
    </div>
  );
}

export default ViewFacilityDetailsPage;
