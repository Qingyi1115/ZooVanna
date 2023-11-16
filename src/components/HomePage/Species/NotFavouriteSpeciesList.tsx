import HorizontalCardContainer from "../../HorizontalCardContainer";
import ImageCardSpecies from "./ImageCardSpecies";

import { useEffect, useState } from "react";

// import { Toast } from "primereact/toast";

import useApiJson from "../../../hooks/useApiJson";
import Species from "../../../models/Species";

import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";

function NotFavouriteSpeciesList() {
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

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/species/getSpeciesNotLovedByCustomer`,
        );
        setSpeciesList(responseJson.result as Species[]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchSpecies();
  }, []);

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-xl font-extrabold">Add into Favourites</h1>
      </div>
      {speciesList.length > 0 ? (
        <div>
          {speciesList.map((species) => (
            <div className="py-2">
              <Link to={`/species/viewspecies/${species.speciesCode}`}>
                <ImageCardSpecies
                  species={species}
                  key={species.speciesId}
                  imageUrl={`http://${localhost_address}/` + species.imageUrl}
                  title={species.commonName}
                  description={""}
                />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex px-4 pt-4">
          All animals have already been added to Favourite List!
        </div>
      )}
    </div>
  );
}

export default NotFavouriteSpeciesList;
