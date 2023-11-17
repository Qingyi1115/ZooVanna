import { Button } from "@/components/ui/button";
import ViewAllItineraryDetails from "../../components/ItineraryPage/ViewAllItineraryDetails";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import Species from "../../models/Species";

interface SpeciesWithSelected extends Species {
  selected: boolean;
}

function ItineraryPage() {
  const navigate = useNavigate();
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [speciesList, setSpeciesList] = useState<SpeciesWithSelected[]>();

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/species/getAllSpeciesCustomer`,
        );

        const responseLovedSpecies = await apiJson.get(
          `http://${localhost_address}/api/species/getSpeciesLovedByCustomer`,
        );

        const lovedSpecies: SpeciesWithSelected[] = responseLovedSpecies.result;

        const updatedSpeciesList: SpeciesWithSelected[] = responseJson.map(
          (species: Species) => ({
            ...species,
            selected: lovedSpecies.some(
              (lovedSpeciesItem) =>
                lovedSpeciesItem.speciesCode === species.speciesCode,
            ),
          }),
        );

        setSpeciesList(updatedSpeciesList);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchSpecies();
  }, []);
  return (
    <div className="mb-3 px-6 pt-10">
      <div className="">
        <h1 className="text-2xl font-bold">Itinerary</h1>
      </div>
      <Button
        className="mt-5"
        onClick={() =>
          speciesList &&
          navigate("/createItinerary", { state: { speciesList } })
        }
      >
        Create New Itinerary
      </Button>
      <ViewAllItineraryDetails />
    </div>
  );
}

export default ItineraryPage;
