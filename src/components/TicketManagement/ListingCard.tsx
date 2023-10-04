import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Listing from "../../models/Listing";
import AddOrMinusButton from "./addOrMinusButton";
import { Button } from "@/components/ui/button";

interface ListingProps {
  listing: Listing;
  isChecked: boolean;
}

function ListingCard(props: ListingProps) {
  const listing = props.listing;
  const isChecked = props.isChecked;
  return (
    <div className="mt-9 items-center justify-center">
      {!isChecked ? (
        <div className="bg-gray-300 text-gray-900 cursor-not-allowed justify-center">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">{listing.name}</h2>
            <p className="ml-5 mr-5 font-bold">S${listing.price}</p>
            <AddOrMinusButton listing={listing} isChecked={isChecked} />
          </div>
          <p className="text-sm">{listing.description}</p>
        </div>
      ) : (
        <div className="block justify-center">
          <div className="justify-left flex items-center">
            <h2 className="text-xl font-bold">{listing.name}</h2>
            <p className="ml-5 mr-5 font-bold">S${listing.price}</p>
            <AddOrMinusButton listing={listing} isChecked={true} />
          </div>
          <div className="justify-left flex text-sm">{listing.description}</div>
        </div>
      )}
    </div>
  );
}
export default ListingCard;
