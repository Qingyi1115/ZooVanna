import Facility from "./Facility";
import ItineraryItem from "./ItineraryItem";

interface Enclosure {
  enclosureId: number;
  name: string;
  itineraryItems?: ItineraryItem;
  facility?: Facility;
}

export default Enclosure;
