import { useState } from "react";
import BasicItineraryForm from "../../components/ItineraryPage/BasicItineraryForm";
import GeneratePlaces from "../../components/ItineraryPage/GeneratePlaces";
import Facility from "src/models/Facility";

function CreateItineraryPage() {
  const [itineraryName, setItineraryName] = useState<string>();
  const [plannedDateVisit, setPlannedDateVisit] = useState<
    string | Date | Date[] | null
  >(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [facilities, setFacilities] = useState<Facility[]>();
  return (
    <div className="px-6 pt-10">
      {pageNumber === 1 ? (
        <BasicItineraryForm
          itineraryName={itineraryName}
          setItineraryName={setItineraryName}
          plannedDateVisit={plannedDateVisit}
          setPlannedDateVisit={setPlannedDateVisit}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      ) : pageNumber === 2 ? (
        <GeneratePlaces
          facilities={facilities}
          setFacilities={setFacilities}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      ) : (
        ""
      )}
    </div>
  );
}
export default CreateItineraryPage;
