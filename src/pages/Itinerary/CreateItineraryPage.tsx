import { useEffect, useState } from "react";
import BasicItineraryForm from "../../components/ItineraryPage/BasicItineraryForm";
import Facility from "src/models/Facility";
import Enclosure from "src/models/Enclosure";
import Species from "src/models/Species";
import { Navigate, useLocation } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";

interface SpeciesWithSelected extends Species {
  selected: boolean;
}
function CreateItineraryPage() {
  const location = useLocation();
  const [itineraryName, setItineraryName] = useState<string>();
  const [plannedDateVisit, setPlannedDateVisit] = useState<
    string | Date | Date[] | null
  >(null);
  const [facilities, setFacilities] = useState<Facility[]>();
  const [speciesList, setSpeciesList] = useState<SpeciesWithSelected[]>(
    location.state.speciesList,
  );

  window.addEventListener("beforeunload", function (event) {
    // Cancel the event to prevent the default browser dialog
    event.preventDefault();
    // Chrome requires returnValue to be set
    event.returnValue = "";

    // Your logic here (e.g., displaying a custom confirmation message)
    const confirmationMessage =
      "Are you sure you want to leave? Any unsaved changes may be lost.";
    return confirmationMessage;
  });

  return (
    <div className="px-6 pt-10">
      {speciesList !== undefined && (
        <Navigate
          to={"/basicItinerary"}
          state={{
            itineraryName,
            plannedDateVisit,
            facilities,
            speciesList,
          }}
        />
      )}
    </div>
  );
}
export default CreateItineraryPage;
