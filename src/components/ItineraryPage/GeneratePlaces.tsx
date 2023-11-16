import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";
import Species from "../../models/Species";

interface itineraryProps {
  facilities: Facility[] | undefined;
  setFacilities: any;
  pageNumber: number;
  setPageNumber: any;
}

function GeneratePlaces(props: itineraryProps) {
  const { facilities, setFacilities, pageNumber, setPageNumber } = props;
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchSpecies = async () => {
      let places = [];
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/species/getSpeciesLovedByCustomer`,
        );

        for (const species of responseJson.result) {
          places.push(responseJson.result.animals[0].enclosure.facility);
        }
        setFacilities(places as Facility[]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchSpecies();
  }, []);
  return (
    <div>
      <div className="text-2xl font-bold">2. Select Places to Go </div>
      <div className="pt-5">
        <div className="flex justify-between">
          <Button
            className="w-2/5"
            onClick={() => setPageNumber(pageNumber - 1)}
          >
            Back
          </Button>
          <Button
            className="w-2/5"
            onClick={() => setPageNumber(pageNumber + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GeneratePlaces;
