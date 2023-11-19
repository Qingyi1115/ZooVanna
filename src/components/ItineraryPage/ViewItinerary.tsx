import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import Facility from "../../models/Facility";
import Species from "../../models/Species";
import { Button } from "@/components/ui/button";
import MapComponent from "../Map/MapComponent";
import ItineraryMapComponent from "../Map/ItineraryMapComponent";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImageCardSide from "../ImageCardSide";
import ImageCard from "../ImageCard";
import Itinerary from "../../models/Itinerary";
import { convertUtcToTimezone } from "../../helpers/timeZone";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Dialog } from "primereact/dialog";

interface SpeciesWithSelected extends Species {
  selected: boolean;
}
function ViewItinerary() {
  const location = useLocation();
  const navigate = useNavigate();

  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [speciesList, setSpeciesList] = useState<SpeciesWithSelected[]>();
  const [refreshSeed, setRefreshSeed] = useState<number>(0);
  const { itineraryId } = useParams<{ itineraryId: string }>();
  const [itinerary, setItinerary] = useState<Itinerary>();
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [dialog, setDialog] = useState<boolean>(false);

  const handleDialog = () => {
    setDialog(true);
  };

  const hideDialog = () => {
    setDialog(false);
  };

  const dialogFooter = (
    <div className="p-0">
      <div className="mt-2 flex w-full justify-end">
        <Button onClick={hideDialog}>No</Button>
        <Button onClick={deleteItinerary}>Yes</Button>
      </div>
    </div>
  );

  useEffect(() => {
    apiJson
      .get(
        `http://${localhost_address}/api/itinerary/getItineraryById/${itineraryId}`,
      )
      .catch((error) => console.log(error))
      .then((result) => {
        setItinerary(result.result);

        apiJson
          .get(`http://${localhost_address}/api/species/getAllSpeciesCustomer`)
          .catch((error) => console.log(error))
          .then((responseJson) => {
            const lovedSpecies: SpeciesWithSelected[] = result.result.specieses;
            setSpeciesList(
              responseJson.map((species: Species) => ({
                ...species,
                selected: lovedSpecies.some(
                  (lovedSpeciesItem) =>
                    lovedSpeciesItem.speciesCode === species.speciesCode,
                ),
              })),
            );
          });
      });
  }, []);

  useEffect(() => {
    apiJson
      .get(
        `http://${localhost_address}/api/itinerary/getFacilitiesInOrder/${itineraryId}`,
      )
      .catch((error) => console.log(error))
      .then((result) => {
        setFacilities(result.result);
      });
  }, []);

  function deleteItinerary() {
    apiJson
      .del(
        `http://${localhost_address}/api/itinerary/deleteItinerary/${itineraryId}`,
      )
      .catch((error) => console.log(error))
      .then((message) => {
        console.log(message);
        navigate("/itinerary");
      });
  }

  return (
    <div className="px-6 pt-10">
      <div className="flex items-center justify-between ">
        <div className="text-2xl font-bold">
          Itinerary: {itinerary?.itineraryName}
        </div>
        <div className="ml-5 flex">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100"
            onClick={() =>
              navigate(`/editBasicItinerary`, {
                state: {
                  speciesList,
                  facilities,
                  itineraryId,
                  itineraryName: itinerary?.itineraryName,
                  plannedDateVisit:
                    itinerary && new Date(itinerary.datePlannedVisit),
                },
              })
            }
          >
            <FaEdit className="w-6" />
          </div>
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100"
            onClick={() => handleDialog()}
          >
            <FaTrash />
          </div>
        </div>
      </div>

      <div className="mt-2">
        {itinerary &&
          convertUtcToTimezone(
            new Date(itinerary.datePlannedVisit),
            "Asia/Singapore",
          )}
      </div>
      <div className="mt-5">
        <div className="mb-3 ml-3 text-xl font-bold">Map View</div>
        <div>
          <ItineraryMapComponent facilityList={facilities} />
        </div>
        <div>
          <div className="ml-3 mt-5 text-xl font-bold">Itinerary Order</div>
          <ul className="md:flex md:justify-center">
            {facilities.map((facility, index) => (
              <li className="flex w-full justify-center">
                <Card className="mt-5 h-60 w-full max-w-[400px] p-3 md:justify-center">
                  <CardHeader className="mb-2 p-2 pb-1">
                    <CardTitle>
                      {index + 1} {". "}
                      {facility.facilityName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-1 pt-0">
                    <div className="relative h-40 w-full overflow-hidden rounded-md">
                      <img
                        src={`http://${localhost_address}/` + facility.imageUrl}
                        alt="Card Image"
                        className="absolute left-0 top-0 h-full w-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3 mt-4 flex justify-start">
          <Button
            className="w-2/5 md:w-1/5"
            onClick={() => navigate("/itinerary")}
          >
            Back
          </Button>
        </div>
      </div>
      <Dialog
        visible={dialog}
        style={{ width: "25rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={dialogFooter}
        onHide={hideDialog}
        className="p-0"
      >
        <div className="confirmation-content flex w-full items-center justify-start pt-5">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <div className="ml-3">
            <div className="flex">
              Are you sure you want to delete this itinerary?
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default ViewItinerary;
