import React, { useState } from "react";
import ListingCard from "./ListingCard";
import useApiJson from "../../hooks/useApiJson";
import { useEffect } from "react";
import Listing from "../../models/Listing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NavLink, useLocation } from "react-router-dom";
import { useRef } from "react";
import { ListingStatus } from "../../enums/ListingStatus";

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

function ListingForm() {
  const location = useLocation();
  const [isChecked, setIsChecked] = useState<boolean>(location.state.isChecked);
  let localListingList: Listing[] = location.state.localListingList;
  let foreignerListingList: Listing[] = location.state.foreignerListingList;
  let entry = new Date(
    location.state.entry ? location.state.entry : new Date(Date.now()),
  );

  let personal = location.state.personal;
  const isInitialRender = useRef(true);
  //const [localAdultOrderItem, setLocalAdult] = ;
  const [total, setTotal] = useState<number>(
    Number(location.state.total ? location.state.total : 0),
  );

  console.log(total);
  console.log("here " + localListingList);
  console.log("hereeee " + foreignerListingList);

  const handleCheckboxChange = (isChecked: boolean) => {
    setIsChecked(isChecked);
  };

  for (const listing of foreignerListingList) {
    console.log(listing.orderItems);
    //console.log("this one " + listing.orderItems.length);
  }

  useEffect(() => {
    if (!isChecked) {
      for (const listing of localListingList) {
        if (listing.orderItems) {
          const len = listing.orderItems.length;
          for (let i = 0; i < len; i++) {
            console.log(listing.orderItems.length);
            listing.orderItems.pop();
            setTotal(total - listing.price);
          }
        }
      }
    }
  }, [isChecked]);

  return (
    <div className="block items-center overflow-hidden pb-3 pt-8 lg:pt-10">
      <div className="m-0 mb-7 px-5 text-2xl font-bold md:mb-5 lg:px-20">
        Select Listing
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
              {localListingList?.map(
                (listing) =>
                  listing.listingStatus !== ListingStatus.DISCONTINUED && (
                    <ListingCard
                      listing={listing}
                      isChecked={isChecked}
                      total={total}
                      setTotal={setTotal}
                    />
                  ),
              )}
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
              {foreignerListingList?.map(
                (listing) =>
                  listing.listingStatus !== ListingStatus.DISCONTINUED && (
                    <ListingCard
                      listing={listing}
                      isChecked={true}
                      total={total}
                      setTotal={setTotal}
                    />
                  ),
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-5 flex w-screen justify-end px-5 text-2xl font-bold lg:px-20">
        {total > 0 ? (
          <NavLink
            to="/tickets/selectDate"
            state={{
              localListingList,
              foreignerListingList,
              entry,
              total,
              personal,
              isChecked,
            }}
            className="w-full"
          >
            <Button className="w-full rounded">Next</Button>
          </NavLink>
        ) : (
          <div className="w-full">
            <div className="flex h-8 items-center justify-center bg-red-100 text-sm text-red-600">
              Please select at least one ticket!
            </div>
            <div className="mt-2 flex w-full justify-end">
              <Button className="disabled w-full rounded">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingForm;
