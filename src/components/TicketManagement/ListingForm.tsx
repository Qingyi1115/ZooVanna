import React, { useState } from "react";
import ListingCard from "./ListingCard";
import useApiJson from "../../hooks/useApiJson";
import { useEffect } from "react";
import Listing from "../../models/Listing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

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
        className="mb-2 block"
      />
      <label className="text-red-500">{label}</label>
    </div>
  );
}

interface ListingFormProps {
  localListingList: Listing[] | undefined;
  foreignerListingList: Listing[] | undefined;
  entryDate: Date | undefined;
}

function ListingForm(props: ListingFormProps) {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  let localListingList = props.localListingList;
  let foreignerListingList = props.foreignerListingList;
  let entryDate = props.entryDate;
  //const [localAdultOrderItem, setLocalAdult] = ;

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  return (
    <div className="block items-center overflow-hidden pt-5 lg:pt-6">
      <div className="m-0 mb-7 px-5 text-2xl font-bold md:mb-5 lg:px-20">
        1. Select Listing
      </div>
      <div className="mt-0 block w-screen items-center justify-center md:flex">
        <div className="mb-5 flex w-screen items-center justify-center px-5 lg:px-20">
          <Card className="lg:md-50 w-full items-center justify-center md:mt-0">
            <CardHeader className="items-center justify-center">
              <CardTitle className="mb-1 text-2xl font-bold">
                Local Resident?
              </CardTitle>
            </CardHeader>
            <CardContent className="justify-center ">
              <Checkbox
                label="I understand that I will not be permitted from entering if I could not prove my identity at the admission gate"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              {localListingList?.map((listing) => (
                <ListingCard listing={listing} isChecked={isChecked} />
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="mb-5 mt-10 flex w-screen items-center justify-center px-5 pb-5 lg:px-20">
          <Card className="w-full items-center justify-center lg:mt-0">
            <CardHeader className="items-center justify-center">
              <CardTitle className="text-2xl font-bold">
                Foreign Resident?
              </CardTitle>
            </CardHeader>
            <CardContent>
              {foreignerListingList?.map((listing) => (
                <ListingCard listing={listing} isChecked={true} />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-5 flex w-screen justify-end pr-5 text-2xl font-bold lg:pr-20">
        <NavLink
          to="/tickets/selectDate"
          state={{ localListingList, foreignerListingList, entryDate }}
        >
          <Button className="w-20 rounded ">Next</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default ListingForm;
