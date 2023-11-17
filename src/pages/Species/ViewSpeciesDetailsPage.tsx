import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Species from "../../models/Species";

import ViewSpeciesDetails from "../../components/HomePage/Species/ViewSpeciesDetails";

function ViewSpeciesDetailsPage() {
  const apiJson = useApiJson();

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

  const { speciesCode } = useParams<{ speciesCode: string }>();
  const [curSpecies, setCurSpecies] = useState<Species>(emptySpecies);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/species/getSpeciesCustomer/${speciesCode}`,
        );
        console.log(responseJson);
        setCurSpecies(responseJson as Species);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchSpecies();
  }, [refreshSeed]);

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="relative lg:w-1/2">
        <img
          src={`http://${localhost_address}/` + curSpecies.imageUrl}
          alt="Current species image"
          className={`mx-auto w-full max-w-full object-cover lg:mx-0 ${
            window.innerWidth >= 1024
              ? "pl-20 pt-4 lg:rounded-bl-xl lg:rounded-tl-xl"
              : ""
          }`}
        />
        <NavLink to={`/species/viewAllSpecies`} className="absolute left-4 top-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
            <FaChevronLeft />
          </button>
        </NavLink>
      </div>

      <div className="flex flex-col p-6 pt-3 lg:w-1/2">
        <ViewSpeciesDetails curSpecies={curSpecies} />
      </div>
    </div>
  );
}

export default ViewSpeciesDetailsPage;
