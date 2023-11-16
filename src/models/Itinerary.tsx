import Customer from "./Customer";
import ItineraryItem from "./ItineraryItem";

interface Itinerary {
  itineraryId: number;
  datePlannedVisit: Date;
  itineraryName: string;

  customer?: Customer;
  itinerayItems?: ItineraryItem[];
}

export default Itinerary;
