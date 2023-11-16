import { FaChevronRight, FaHeart, FaRegHeart } from "react-icons/fa";
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
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

interface ImageCardProps {
  species: Species;
  key: number;
  imageUrl: string;
  title: string;
  description: string;
  refreshSeed: number;
  setRefreshSeed: any;
}

function ImageCardSpecies({
  species,
  key,
  imageUrl,
  title,
  description,
  refreshSeed,
  setRefreshSeed,
}: ImageCardProps) {
  const { state } = useAuthContext();
  const { user } = state;
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [curSpecies, setCurSpecies] = useState<Species>(species);

  const [loved, setLoved] = useState<boolean>();
  const navigate = useNavigate();

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
        setRefreshSeed(refreshSeed + 1);
      } else {
        const responseJson = await apiJson.put(
          `http://${localhost_address}/api/species/setCustomer/${curSpecies.speciesCode}`,
          curSpecies,
        );
        setCurSpecies(responseJson.result);
        setRefreshSeed(refreshSeed + 1);
      }
      setLoved(!loved);
    } catch (error: any) {
      console.log(error);
    }
  }
  return (
    // fixed bottom-[8vh] left-0 right-0 mx-3 translate-y-full transform bg-white shadow-lg transition-transform duration-1000
    <CardModified className="left-0 right-0 flex items-center rounded-xl">
      <div className="flex h-full items-center justify-center pb-0 pl-3">
        {user ? (
          loved ? (
            <FaHeart
              className=" h-6 w-6 md:h-8 md:w-8"
              onClick={() => changeHeart()}
            />
          ) : (
            <FaRegHeart
              className="h-6 w-6 md:h-8 md:w-8"
              onClick={() => changeHeart()}
            />
          )
        ) : (
          ""
        )}
      </div>
      <div className="m-3 h-30 w-3/5 max-w-[200px] overflow-hidden rounded-xl">
        <img
          src={imageUrl}
          alt="Card Image"
          className="h-full w-full object-cover"
        />
      </div>
      <CardContentModified className="m-0 h-30 w-full p-0">
        <CardHeaderModified className="w-full p-0 pl-3 pt-3">
          <CardTitleModified className="w-full ">
            <div className="">
              <div>{title}</div>
            </div>
          </CardTitleModified>
          <CardDescriptionModified>
            <div className="flex">
              <div>ehloojkljljkj</div>
            </div>
          </CardDescriptionModified>
        </CardHeaderModified>

        {/*<div
            onClick={() =>
              navigate(`/species/viewspecies/${species.speciesCode}`)
            }
            className="p-auto pr-5"
          >
            {">"}
          </div>*/}
      </CardContentModified>

      <NavLink
        to={`/species/viewspecies/${species.speciesCode}`}
        className="p-auto hover:bg-grey-500 flex h-30 w-20 items-center justify-center bg-opacity-75 "
      >
        <FaChevronRight />
      </NavLink>
    </CardModified>
  );
}

export default ImageCardSpecies;
