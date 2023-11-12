import { ListingStatus } from "../enums/ListingStatus";
import { ListingType } from "../enums/ListingType";
import OrderItem from "./OrderItem";

interface Listing {
  listingId: number;
  name: string;
  description: string;
  price: number;
  listingType: ListingType;
  listingStatus: ListingStatus;
  orderItems: OrderItem[];
}

export default Listing;
