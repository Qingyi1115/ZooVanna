import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "primereact/calendar";
import { CalendarChangeEvent } from "primereact/calendar";
import Listing from "../../models/Listing";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import DateFormSummary from "./DateFormSummary";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
function SelectDateForm() {
  const location = useLocation();
  const localListingList: Listing[] = location.state.localListingList;
  const foreignerListingList: Listing[] = location.state.foreignerListingList;
  const entryDate: Date = location.state.entry;
  const total: number = location.state.total;
  const personal: any = location.state.personal;
  const [item, setItem] = useState<number>(0);
  const [entry, setEntry] = useState<string | Date | Date[] | null>(
    new Date(entryDate),
  );
  console.log(entry);
  const listingList: Listing[] = [...localListingList, ...foreignerListingList];
  const isChecked = location.state.isChecked;

  const { state } = useAuthContext();
  const { user } = state;

  useEffect(() => {
    let result = 0;
    for (const listing of listingList) {
      result += listing.orderItems.length;
    }
    setItem(result);
  }, []);

  console.log(localListingList);
  console.log(foreignerListingList);
  return (
    <div className="block items-center overflow-hidden pt-5 lg:pt-20">
      <div className="mb-5 px-5 text-2xl font-bold md:mb-5 lg:px-20">
        Select Date
      </div>
      <div className="mt-0 block w-screen items-center justify-center lg:flex">
        <div className="mb-5 flex w-screen items-center justify-center px-5 lg:px-20">
          <div className=" w-full items-center justify-center md:mt-0">
            <div className="flex items-center justify-around  ">
              <Calendar
                value={entry}
                onChange={(e: CalendarChangeEvent) => {
                  if (e && e.value !== undefined) {
                    setEntry(e.value);
                  }
                }}
                inline
                className="border-0"
                minDate={new Date(Date.now())}
              />
            </div>
          </div>
        </div>
        <div className="mb-2 mt-10 flex w-screen items-center justify-center px-5 pb-5 sm:px-20 md:px-40">
          <Card className="w-full items-center justify-between lg:mt-0">
            <CardHeader className="flex justify-between">
              <CardTitle className="flex justify-between text-2xl font-bold">
                <div>Total Payable:</div>
                <div>S${total}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex justify-between">
                <div className="flex text-xl">Price:</div>
                <div className="flex">S${total}</div>
              </div>

              <Separator className="opacity-20" />
              <div className="flex justify-between">
                <div className="flex">ZooVanna</div>
                <div className="flex">{item}</div>
              </div>
              <div>
                {new Date(
                  entry ? entry.toString() : entryDate.toString(),
                )?.toLocaleDateString()}
              </div>
              <div className="mt-5">
                <div className="text-2xl font-bold">Admissions</div>
                <div className="my-1">ZooVanna admission</div>
                <Separator className="opacity-20" />
                {localListingList?.map(
                  (listing) =>
                    listing.orderItems.length > 0 && (
                      <DateFormSummary listing={listing} />
                    ),
                )}
                {foreignerListingList?.map(
                  (listing) =>
                    listing.orderItems.length > 0 && (
                      <DateFormSummary listing={listing} />
                    ),
                )}
              </div>

              <Separator className="opacity-20" />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="mb-5 flex w-screen justify-end px-5 text-2xl font-bold sm:px-30 md:px-40 lg:px-40">
        <NavLink
          to="/tickets/selectListing/listingForm"
          state={{
            localListingList,
            foreignerListingList,
            entry,
            total,
            item,
            personal,
            isChecked,
          }}
          className="mr-5"
        >
          <Button className="w-20 rounded">Back</Button>
        </NavLink>
        {!user ? (
          <NavLink
            to="/tickets/personalDetails"
            state={{
              localListingList,
              foreignerListingList,
              entry,
              total,
              item,
              personal,
              isChecked,
            }}
          >
            <Button className="w-20 rounded">Next</Button>
          </NavLink>
        ) : (
          <NavLink
            to="/tickets/orderReview"
            state={{
              localListingList,
              foreignerListingList,
              entry,
              total,
              item,
              personal,
              isChecked,
            }}
          >
            <Button className="w-20 rounded">Next</Button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
export default SelectDateForm;
