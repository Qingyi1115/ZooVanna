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
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}

function ListingCard(props: ListingProps) {
  const listing = props.listing;
  const isChecked = props.isChecked;
  const total = props.total;
  const setTotal = props.setTotal;
  console.log("Listing Card" + listing.orderItems);
  return (
    <div className="mt-9 items-center justify-center">
      {!isChecked ? (
        <div className="bg-gray-300 text-gray-900 cursor-not-allowed justify-center">
          <div className="flex items-center">
            <h2 className="text-xl font-bold">{listing.name}</h2>
            <p className="ml-5 mr-5 font-bold">S${listing.price}</p>
            <AddOrMinusButton
              listing={listing}
              isChecked={isChecked}
              total={total}
              setTotal={setTotal}
            />
          </div>
          <p className="text-sm">{listing.description}</p>
        </div>
      ) : (
        <div className="block justify-center">
          <div className="justify-left flex items-center">
            <h2 className="text-xl font-bold">{listing.name}</h2>
            <p className="ml-5 mr-5 font-bold">S${listing.price}</p>
            <AddOrMinusButton
              listing={listing}
              isChecked={true}
              total={total}
              setTotal={setTotal}
            />
          </div>
          <div className="justify-left flex text-sm">{listing.description}</div>
        </div>
      )}
    </div>
  );
}
export default ListingCard;
