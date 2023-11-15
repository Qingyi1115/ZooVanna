import { Button } from "@/components/ui/button";
import "primeicons/primeicons.css";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Listing from "../../models/Listing";

interface ButtonProps {
  listing: Listing;
  isChecked: boolean;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}
function AddOrMinusButton(props: ButtonProps) {
  const isChecked = props.isChecked;
  const listing = props.listing;
  let total: number = Number(props.total);
  const setTotal = props.setTotal;

  if (!total) {
    total = 0;
  }

  console.log("Add or Minus " + total);
  console.log("Add or Minus " + listing.orderItems);

  if (!listing.orderItems) {
    listing.orderItems = [];
  }
  let [count, setCount] = useState<number>(listing.orderItems.length);

  useEffect(() => {
    console.log("here");
    if (!isChecked) {
      setCount(0);
    }
  }, [isChecked]);

  console.log(listing.orderItems);
  console.log("is it here");

  function incNum() {
    listing.orderItems.push({
      isRedeemed: 0,
      verificationCode: uuidv4(),
      timeRedeemed: null,
    });
    setCount(count + 1);
    setTotal(Number(total) + Number(listing.price));
  }

  function decNum() {
    if (listing.orderItems.length > 0 && count > 0) {
      setCount(count - 1);
      listing.orderItems.pop();
      setTotal(Number(total) - Number(listing.price));
    }
  }

  function setLOItem() {}

  return (
    <div className="flex justify-center px-2">
      {!isChecked ? (
        <div className="flex w-full cursor-not-allowed items-center justify-around">
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
            onClick={() => incNum()}
          >
            +
          </Button>
        </div>
      ) : (
        <div className="flex w-full items-center justify-around ">
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
