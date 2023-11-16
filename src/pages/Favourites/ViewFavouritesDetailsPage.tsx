import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Species from "../../models/Species";

import ViewSpeciesDetails from "../../components/HomePage/Species/ViewSpeciesDetails";
import { useToast } from "@/components/ui/use-toast";
import { useAuthContext } from "../../hooks/useAuthContext";
import Customer from "src/models/Customer";

function ViewFavouritesDetailsPage() {
  const apiJson = useApiJson();
  const { state } = useAuthContext();
  const { user } = state;

  const [loved, setLoved] = useState<boolean>();
  const toastShadcn = useToast().toast;

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

        if (
          responseJson.customers?.find((speciesCustomer: Customer) => {
            return speciesCustomer.email === user?.email;
          })
        ) {
          setLoved(true);
        } else {
          setLoved(false);
        }
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchSpecies();
  }, []);

  {
    /*useEffect(() => {
    if (user) {
      console.log("hereeee");
      apiJson
        .get(`http://${localhost_address}/api/customer/getCustomer`)
        .catch((error) => {
          console.log(error);
          toastShadcn({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "An error has occurred while retrieving customer \n" + error,
          });
        })
        .then((res: Customer) => {
          console.log("this one here " + res);
          console.log(res);
          console.log(curSpecies.customers);
          if (curSpecies.customers?.includes(res)) {
            console.log(" is it here? ");
            setLoved(true);
          } else {
            console.log("or here? ");
            setLoved(false);
          }
        });
    }
  }, []);*/
  }

  {
    /*useEffect(() => {
    apiJson
      .get(
        `http://${localhost_address}/api/species/isThisLovedByCustomer/${speciesCode}`,
      )
      .catch((error) => console.log(error))
      .then((result) => {
        setLoved(result.result as boolean);
        console.log(result.result);
      });
  }, []);*/
  }

  async function changeHeart() {
    try {
      if (loved === true) {
        const responseJson = await apiJson.put(
          `http://${localhost_address}/api/species/unSetCustomer/${speciesCode}`,
          curSpecies,
        );
        setCurSpecies(responseJson.result);
      } else {
        const responseJson = await apiJson.put(
          `http://${localhost_address}/api/species/setCustomer/${speciesCode}`,
          curSpecies,
        );
        setCurSpecies(responseJson.result);
      }
      setLoved(!loved);
    } catch (error: any) {
      console.log(error);
    }
  }

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
        <div className="absolute left-4 top-4">
          <button
            onClick={() => window.history.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black"
          >
            <FaChevronLeft />
          </button>
        </div>
      </div>

      <div className="flex flex-col p-6 pt-3 lg:w-1/2">
        {loved !== undefined && (
          <ViewSpeciesDetails
            curSpecies={curSpecies}
            loved={loved}
            refreshSeed={refreshSeed}
            setRefreshSeed={setRefreshSeed}
            changeHeart={changeHeart}
          />
        )}
      </div>
    </div>
  );
}

export default ViewFavouritesDetailsPage;
