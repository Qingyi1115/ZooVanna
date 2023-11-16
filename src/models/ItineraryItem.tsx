import Enclosure from "./Enclosure";
import Facility from "./Facility";
import Itinerary from "./Itinerary";

interface ItineraryItem {
  orderNum: number;

  itinerary: Itinerary;
  enclosure?: Enclosure;
  facility?: Facility;
}

export default ItineraryItem;
