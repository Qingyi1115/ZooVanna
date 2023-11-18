import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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

interface SpeciesWithSelected extends Species {
  selected: boolean;
}

function Generate() {
  const location = useLocation();
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState<Facility[]>(
    location.state.facilities,
  );
  const [speciesList, setSpeciesList] = useState<SpeciesWithSelected[]>(
    location.state.speciesList,
  );
  console.log("here is " + speciesList);

  const itineraryName: string = location.state.itineraryName;
  const plannedDateVisit = location.state.plannedDateVisit;
  const apiJson = useApiJson();
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  useEffect(() => {
    const speciesData: SpeciesWithSelected[] = [];
    speciesList
      .filter((species) => species.selected === true)
      .map((species) => speciesData.push(species));

    apiJson
      .post(
        `http://localhost:3000/api/itinerary/optimizeItineraryRoute`,
        speciesData,
      )
      .catch((error) => console.log(error))
      .then((result) => {
        console.log(result.result);
        setFacilities(result.result);
      });
  }, []);

  function onDragEnd(result: any) {
    if (!result.destination) return;

    const reorderedItems = Array.from(facilities);
    const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, reorderedItem);

    setFacilities(reorderedItems);
  }

  return (
    <div className="px-6 pt-10">
      <div className="text-2xl font-bold">3. Generate Places </div>
      <div className="pt-5">
        <div>
          {" "}
          <ItineraryMapComponent facilityList={facilities} />
        </div>
        <div>
          <div className="ml-3 mt-5 text-2xl font-medium">Itinerary Order</div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {facilities.map((facility, index) => (
                    <Draggable
                      key={facility.facilityId}
                      draggableId={facility.facilityId.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="w-full"
                        >
                          <Card className="mt-5 h-60 w-full p-3">
                            <CardHeader className="mb-2 p-2">
                              <CardTitle>
                                {index + 1} {". "}
                                {facility.facilityName}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="relative h-30 w-full overflow-hidden">
                                <img
                                  src={
                                    `http://${localhost_address}/` +
                                    facility.imageUrl
                                  }
                                  alt="Card Image"
                                  className="absolute left-0 top-0 h-full w-full object-cover"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="mb-3 mt-4 flex justify-between">
          <Button
            className="w-2/5 md:w-1/5"
            onClick={() =>
              navigate("/selectPlaces", {
                state: {
                  facilities,
                  speciesList,
                  itineraryName,
                  plannedDateVisit,
                },
              })
            }
          >
            Back
          </Button>
          <Button
            className="w-2/5 md:w-1/5"
            onClick={() =>
              navigate("/generatePlaces", {
                state: {
                  facilities,
                  speciesList,
                  itineraryName,
                  plannedDateVisit,
                },
              })
            }
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Generate;
