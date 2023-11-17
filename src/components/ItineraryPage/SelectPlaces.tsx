import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";
import Species from "../../models/Species";
import Enclosure from "src/models/Enclosure";
import ImageCardSpecies from "../HomePage/Species/ImageCardSpecies";
import ImageCardSpeciesForFacility from "../HomePage/Species/ImageCardSpeciesForFacility";
import { useLocation, useNavigate } from "react-router-dom";

interface SpeciesWithSelected extends Species {
  selected: boolean;
}

function SelectPlaces() {
  const location = useLocation();
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<Facility[]>(
    location.state.facilities,
  );
  const [speciesList, setSpeciesList] = useState<SpeciesWithSelected[]>(
    location.state.speciesList,
  );

  const itineraryName: string = location.state.itineraryName;
  const plannedDateVisit = location.state.plannedDateVisit;
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  useEffect(() => {
    const fetchSpecies = async () => {
      let places: Facility[] | undefined = [];
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/species/getFacilityForSpeciesLovedByCustomer`,
        );
        setFacilities(responseJson.result);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchSpecies();
  }, []);

  {
    /*useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/species/getSpeciesLovedByCustomer`,
        );
        const speciesData: SpeciesWithSelected[] = responseJson.result.map(
          (species: any) => ({
            ...species,
            selected: true,
          }),
        );

        setSelectedSpeciesList(speciesData);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchSpecies();
  }, []);*/
  }

  {
    /*function handleMarkerClick(selectedFacility: FacilityWithSelected) {
    const tempFacilityList = facilityList.map((facility) =>
      facility.facilityId === selectedFacility.facilityId
        ? { ...facility, selected: !facility.selected }
        : { ...facility, selected: false }
    );
    setSelectedFacility(selectedFacility);
    setIsShownOnMap(selectedFacility.showOnMap);
  setFacilityList(tempFacilityList);*/
  }

  function handleClick(selectedSpecies: SpeciesWithSelected) {
    const tempSpeciesList = speciesList.map((species) =>
      species.speciesCode === selectedSpecies.speciesCode
        ? { ...species, selected: !species.selected }
        : species,
    );
    setSpeciesList(tempSpeciesList);
  }

  return (
    <div className="px-6 pt-10">
      <div className="text-2xl font-bold">2. Select Animals to Visit </div>
      <div className="pt-5">
        {speciesList && (
          <div>
            {speciesList.map((species) => (
              <div className="py-2">
                <ImageCardSpeciesForFacility
                  species={species}
                  key={species.speciesId}
                  imageUrl={`http://${localhost_address}/` + species.imageUrl}
                  title={species.commonName}
                  description={""}
                  selected={species.selected}
                  handleClick={handleClick}
                />
              </div>
            ))}
          </div>
        )}
        <div className="mb-3 mt-4 flex justify-between">
          <Button
            className="w-2/5 md:w-1/5"
            onClick={() =>
              navigate("/basicItinerary", {
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
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SelectPlaces;
