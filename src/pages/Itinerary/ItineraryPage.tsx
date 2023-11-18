import { Button } from "@/components/ui/button";
import ViewAllItineraryDetails from "../../components/ItineraryPage/ViewAllItineraryDetails";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import Species from "../../models/Species";
import Itinerary from "src/models/Itinerary";
import HorizontalCardContainer from "../../components/HorizontalCardContainer";
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { convertUtcToTimezone } from "../../helpers/timeZone";

interface SpeciesWithSelected extends Species {
  selected: boolean;
}

function ItineraryPage() {
  const navigate = useNavigate();
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [speciesList, setSpeciesList] = useState<SpeciesWithSelected[]>();
  const [itineraryList, setItineraryList] = useState<Itinerary[]>();

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

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/customer/getCustomer`,
        );
        setItineraryList(responseJson.itineraries as Itinerary[]);
        console.log(responseJson.result);
        console.log(responseJson.result);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCustomerData();
    // console.log(currCustomer);
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
      <div className="mb-2 pt-8">
        <h1 className="text-xl font-extrabold">All Itineraries</h1>
      </div>
      <div className="mb-5 md:flex md:flex-row md:gap-4">
        {itineraryList &&
          itineraryList.map((item) => (
            <Card
              className="mb-3 p-3"
              onClick={() => navigate(`/viewItinerary/${item.itineraryId}`)}
            >
              <CardContent className="p-0">
                <div className="font-medium">{item.itineraryName}</div>
                <div>
                  Planned Date Visit:{" "}
                  {convertUtcToTimezone(
                    new Date(item.datePlannedVisit),
                    "Asia/Singapore",
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default ItineraryPage;
