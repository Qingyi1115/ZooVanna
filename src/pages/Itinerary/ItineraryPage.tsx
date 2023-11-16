import { Button } from "@/components/ui/button";
import ViewAllItineraryDetails from "../../components/ItineraryPage/ViewAllItineraryDetails";
import { useNavigate } from "react-router-dom";

function ItineraryPage() {
  const navigate = useNavigate();
  return (
    <div className="mb-3 px-6 pt-10">
      <div className="">
        <h1 className="text-2xl font-bold">Itinerary</h1>
      </div>
      <Button className="mt-5" onClick={() => navigate("/createItinerary")}>
        Create New Itinerary
      </Button>
      <ViewAllItineraryDetails />
    </div>
  );
}

export default ItineraryPage;
