import HorizontalCardContainer from "../../HorizontalCardContainer";
import ImageCardSpecies from "./ImageCardSpecies";

import { useEffect, useState } from "react";

// import { Toast } from "primereact/toast";

import useApiJson from "../../../hooks/useApiJson";
import Species from "../../../models/Species";

import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";

function SpeciesList() {
  const apiJson = useApiJson();

  // date options
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  let emptySpecies: Species = {
    speciesId: -1,
    speciesCode: "",
    commonName: "",
    scientificName: "",
    aliasName: "",
    conservationStatus: "",
    speciesClass: "",
    nativeContinent: "",
    educationalDescription: "",
    educationalFunFact: "",
    habitatOrExhibit: "habitat",
    imageUrl: "",
  };

  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<Species>(emptySpecies);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/species/getAllSpeciesCustomer`,
        );
        setSpeciesList(responseJson as Species[]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchSpecies();
  }, [refreshSeed]);

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-xl font-extrabold">Animals in Merlion Zoo</h1>
      </div>
      {speciesList && (
        <div>
          {speciesList.map((species) => (
            <div className="py-2">
              <ImageCardSpecies
                species={species}
                key={species.speciesId}
                imageUrl={`http://${localhost_address}/` + species.imageUrl}
                title={species.commonName}
                description={""}
                refreshSeed={refreshSeed}
                setRefreshSeed={setRefreshSeed}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SpeciesList;
