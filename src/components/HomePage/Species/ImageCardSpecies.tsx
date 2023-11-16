import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthContext } from "../../../hooks/useAuthContext";
import {
  CardContentModified,
  CardDescriptionModified,
  CardHeaderModified,
  CardModified,
  CardTitleModified,
} from "../../CardModified";
import { useEffect, useState } from "react";
import useApiJson from "../../../hooks/useApiJson";
import Species from "../../../models/Species";
import Customer from "src/models/Customer";
import { Link } from "react-router-dom";

interface ImageCardProps {
  species: Species;
  key: number;
  imageUrl: string;
  title: string;
  description: string;
}

function ImageCardSpecies({
  species,
  key,
  imageUrl,
  title,
  description,
}: ImageCardProps) {
  const { state } = useAuthContext();
  const { user } = state;
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [curSpecies, setCurSpecies] = useState<Species>(species);

  const [loved, setLoved] = useState<boolean>();

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/species/getSpeciesCustomer/${species.speciesCode}`,
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

  async function changeHeart() {
    try {
      if (loved === true) {
        const responseJson = await apiJson.put(
          `http://${localhost_address}/api/species/unSetCustomer/${curSpecies.speciesCode}`,
          curSpecies,
        );
        setCurSpecies(responseJson.result);
      } else {
        const responseJson = await apiJson.put(
          `http://${localhost_address}/api/species/setCustomer/${curSpecies.speciesCode}`,
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
    // fixed bottom-[8vh] left-0 right-0 mx-3 translate-y-full transform bg-white shadow-lg transition-transform duration-1000
    <CardModified className="left-0 right-0 mx-3 flex items-center rounded-xl">
      <div className="m-2 h-30 w-3/5 max-w-[200px] overflow-hidden rounded-xl">
        <img
          src={imageUrl}
          alt="Card Image"
          className="h-full w-full object-cover"
        />
      </div>
      <CardContentModified className="w-3/4">
        <CardHeaderModified>
          <CardTitleModified>
            <div className="flex items-center justify-between">
              <div>{title}</div>
            </div>
          </CardTitleModified>
          <CardDescriptionModified>
            <div className="flex">
              <div>{description}</div>
            </div>
          </CardDescriptionModified>
        </CardHeaderModified>
        <div className="flex h-full justify-end pb-0 pr-5">
          {user ? (
            loved ? (
              <FaHeart className=" h-8 w-8" onClick={() => changeHeart()} />
            ) : (
              <FaRegHeart className="h-8 w-8" onClick={() => changeHeart()} />
            )
          ) : (
            ""
          )}
        </div>
      </CardContentModified>
    </CardModified>
  );
}

export default ImageCardSpecies;
