import React, { useState } from "react";
import ListingCard from "./ListingCard";
import useApiJson from "../../hooks/useApiJson";
import { useEffect } from "react";
import Listing from "../../models/Listing";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <div className="w-80 lg:w-100">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="block"
      />
      <label className="text-red-500">{label}</label>
    </div>
  );
}

function ListingForm() {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [listingList, setListingList] = useState<Listing[]>();
  const apiJson = useApiJson();

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  useEffect(() => {
    apiJson
      .get("http://localhost:3000/api/listingCustomer/getAllListings")
      .catch((err) => console.log(err))
      .then((res) => {
        console.log(res);
        setListingList(res.result as Listing[]);
      });
  }, []);

  return (
    <div>
      {listingList?.map((listing: Listing) => (
        <div className="block h-screen items-center justify-center md:flex">
          <div className="ml-12 mt-40 items-center justify-center md:ml-0 md:mt-0">
            <h2 className="mb-5 font-bold">Local Resident?</h2>
            <Checkbox
              label="I understand that I will not be permitted from entering if I could not prove my identity at the admission gate"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
            {isChecked && listing.listingType !== "FOREIGNER_ONETIME" && (
              <ListingCard
                listingId={listing.listingId}
                name={listing.name}
                description={listing.description}
                price={listing.price}
                listingType={listing.listingType}
                listingStatus={listing.listingStatus}
                orderItems={listing.orderItems}
                //maybe need to put isChecked here
              />
            )}
          </div>
          <div className="ml-12 mt-20 items-center justify-center  md:mt-0 lg:ml-30 lg:mt-0">
            <h2 className="font-bold">Foreign Resident</h2>
            <ListingCard
              listingId={listing.listingId}
              name={listing.name}
              description={listing.description}
              price={listing.price}
              listingType={listing.listingType}
              listingStatus={listing.listingStatus}
              orderItems={listing.orderItems}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListingForm;
