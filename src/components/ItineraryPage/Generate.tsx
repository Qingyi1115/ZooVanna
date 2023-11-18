import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";
import Species from "../../models/Species";
import { Button } from "@/components/ui/button";

interface SpeciesWithSelected extends Species {
  selected: boolean;
}

function Generate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<Facility[]>(
    location.state.facilities,
  );
  const [speciesList, setSpeciesList] = useState<SpeciesWithSelected[]>(
    location.state.speciesList,
  );
  console.log("here is " + speciesList);

  const itineraryName: string = location.state.itineraryName;
  const plannedDateVisit = location.state.plannedDateVisit;
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  useEffect(() => {
    const speciesData: SpeciesWithSelected[] = [];
    speciesList
      .filter((species) => species.selected === true)
      .map((species) => speciesData.push(species));

    apiJson
      .post(
        `http://localhost:3000/api/itinerary/optimizeItineraryRoute`,
        speciesData,
      )
      .catch((error) => console.log(error))
      .then((result) => {
        console.log(result.result);
        setFacilities(result.result);
      });
  }, []);

  return (
    <div className="px-6 pt-10">
      <div className="text-2xl font-bold">3. Generate Places </div>
      <div className="pt-5">
        Helloooooo
        <div className="mb-3 mt-4 flex justify-between">
          <Button
            className="w-2/5 md:w-1/5"
            onClick={() =>
              navigate("/selectPlaces", {
                state: {
                  facilities,
                  speciesList,
                  itineraryName,
                  plannedDateVisit,
                },
              })
            }
          >
            Back
          </Button>
          <Button
            className="w-2/5 md:w-1/5"
            onClick={() =>
              navigate("/generatePlaces", {
                state: {
                  facilities,
                  speciesList,
                  itineraryName,
                  plannedDateVisit,
                },
              })
            }
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Generate;
