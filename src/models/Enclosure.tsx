import ItineraryItem from "./ItineraryItem";

interface Enclosure {
  enclosureId: number;
  name: string;
  itineraryItems?: ItineraryItem;
}

export default Enclosure;
