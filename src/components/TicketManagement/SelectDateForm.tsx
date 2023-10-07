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
  const [total, setTotal] = useState<number>(0);
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
      if (listing.orderItems) {
        result += listing.orderItems.length;
      } else {
        listing.orderItems = [];
      }
    }
    setItem(result);
  }, []);

  useEffect(() => {
    let result = 0;
    for (const listing of listingList) {
      if (listing.orderItems) {
        result += listing.orderItems.length * listing.price;
      }
    }
    setTotal(result);
  }, []);

  console.log(localListingList);
  console.log(foreignerListingList);
  return (
    <div className="block items-center overflow-hidden pt-5 lg:pt-30">
      <div className="mb-5 px-10 text-2xl font-bold sm:px-20 md:mb-5 md:px-40 lg:px-27">
        Select Date
      </div>
      <div className="mt-0 block w-screen items-center justify-center lg:flex">
        <div className="mb-5 flex w-screen items-center justify-center px-5 lg:px-20">
          <div className=" w-full items-center justify-center px-5 sm:px-15 md:mt-0 md:px-35 lg:p-0 lg:px-8">
            <div className="flex items-center  ">
              <Calendar
                value={entry}
                onChange={(e: CalendarChangeEvent) => {
                  if (e && e.value !== undefined) {
                    setEntry(e.value);
                  }
                }}
                inline
                className="w-full border-0 "
                minDate={new Date(Date.now())}
              />
            </div>
          </div>
        </div>
        <div className="mb-2 flex w-screen items-center justify-center px-10 pb-5 sm:px-20 md:px-40 lg:p-0 lg:px-20">
          <div className="flex w-full items-center">
            <Card className="w-full items-center justify-center lg:mt-0">
              <CardHeader className="flex justify-between">
                <CardTitle className="flex justify-between text-xl font-bold">
                  <div>Total Payable:</div>
                  <div>S${total}</div>
                </CardTitle>
              </CardHeader>
              <CardContent className="">
                <div className="mb-2 flex justify-between">
                  <div className="text-l flex">Subtotal:</div>
                  <div className="flex">S${total}</div>
                </div>

                <Separator className="opacity-20" />
                <div className="mt-5">
                  <div className="text-xl font-bold">Admissions</div>
                  <div className="flex justify-between">
                    <div className="flex">Merlion Zoo</div>
                    <div className="flex">{item} item(s)</div>
                  </div>
                  <div className="mb-2 text-xs">
                    {new Date(
                      entry ? entry.toString() : entryDate.toString(),
                    )?.toLocaleDateString()}
                  </div>
                  <Separator className="opacity-20" />
                  {localListingList?.map(
                    (listing) =>
                      listing.orderItems?.length > 0 && (
                        <DateFormSummary listing={listing} />
                      ),
                  )}
                  {foreignerListingList?.map(
                    (listing) =>
                      listing.orderItems?.length > 0 && (
                        <DateFormSummary listing={listing} />
                      ),
                  )}
                </div>

                <Separator className="opacity-20" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="mb-5 flex w-screen justify-between px-10 text-2xl font-bold sm:px-20 md:px-40 lg:px-20">
        <div className="justify-left w-2/5 lg:ml-8 lg:w-1/5">
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
          >
            <Button className="w-full rounded">Back</Button>
          </NavLink>
        </div>

        {!user ? (
          <div className="justify-right w-2/5 lg:w-1/5">
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
              <Button className="w-full rounded">Next</Button>
            </NavLink>
          </div>
        ) : (
          <div className="justify-right w-2/5 lg:w-1/5">
            {" "}
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
              <Button className="w-full rounded">Next</Button>
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}
export default SelectDateForm;
