import "primeicons/primeicons.css";
import { Button } from "@/components/ui/button";
import Listing from "../../models/Listing";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

interface ButtonProps {
  listing: Listing;
  isChecked: boolean;
}
function AddOrMinusButton(props: ButtonProps) {
  const isChecked = props.isChecked;
  const listing = props.listing;
  if (!listing.orderItems) {
    listing.orderItems = [];
  }
  let [count, setCount] = useState<number>(listing.orderItems.length);

  console.log(listing.orderItems);
  console.log("is it here");

  async function incNum() {
    listing.orderItems.push({
      isRedeemed: false,
      verificationCode: uuidv4(),
      timeRedeemed: null,
    });
    console.log("YES");
    console.log(listing.orderItems);
    setCount(count + 1);
  }

  async function decNum() {
    if (listing.orderItems.length > 0 && count > 0) {
      setCount(count - 1);
      listing.orderItems.pop();
    }
  }

  function setLOItem() {}

  return (
    <div className="flex justify-center px-2">
      {!isChecked ? (
        <div className="flex w-50 cursor-not-allowed items-center justify-around">
          <Button
            className="h-8 w-8 rounded-full text-white hover:bg-green-500"
            disabled
            onClick={decNum}
          >
            -
          </Button>
          <div className="flex h-11 w-11 items-center justify-center  text-xl">
            {count}
          </div>
          <Button
            className="flex h-8 w-8 rounded-full text-white hover:bg-green-500"
            disabled
            onClick={incNum}
          >
            +
          </Button>
        </div>
      ) : (
        <div className="flex w-50 items-center justify-around ">
          <Button
            className="h-8 w-8 rounded-full text-white hover:bg-green-500"
            onClick={decNum}
          >
            -
          </Button>
          <div className="flex h-11 w-11 items-center justify-center text-xl">
            {count}
          </div>
          <Button
            className="flex h-8 w-8 rounded-full text-white hover:bg-green-500"
            onClick={incNum}
          >
            +
          </Button>
        </div>
      )}
    </div>
  );
}

export default AddOrMinusButton;
