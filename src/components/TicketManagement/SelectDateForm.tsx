import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, CalendarChangeEvent, CalendarDateTemplateEvent } from "primereact/calendar";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import { useAuthContext } from "../../hooks/useAuthContext";
import Listing from "../../models/Listing";
import DateFormSummary from "./DateFormSummary";
function SelectDateForm() {
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
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

  const listingList: Listing[] = [...localListingList, ...foreignerListingList];
  const isChecked = location.state.isChecked;
  const [dates, setDates] = useState<any>();
  const [disabledDates, setDisabledDates] = useState<Date[]>();

  const { state } = useAuthContext();
  const { user } = state;
  const apiJson = useApiJson();

  const minDate = new Date(Date.now());
  minDate.setHours(0, 0, 0);
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  maxDate.setHours(0, 0, 0);

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

  useEffect(() => {
    apiJson
      .get(`http://${localhost_address}/api/orderItem/getDateOrderCount`)
      .then((result) => {
        setDates(result.result);
        let temp: Date[] = [];
        const currentDate = new Date(minDate);
        while (currentDate <= maxDate) {
          if (
            (result.result[currentDate.getTime()] &&
              result.result[currentDate.getTime()] + item > 25) ||
            item > 25
          ) {
            temp.push(new Date(currentDate.getTime()));
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        {
          /*for (var key in result.result) {
          if (result.result[key] + item > 25) {
            temp.push(new Date(key));
          }
        }*/
        }
        console.log(temp);
        setDisabledDates(temp);
      });
  }, [item]);

  const dateTemplate = (date: CalendarDateTemplateEvent) => {
    const example = new Date(date.year, date.month, date.day);
    console.log(example.getTime());
    console.log(dates);
    {
      /*if (dates) {
      console.log(
        dates[example.getTime()] === undefined
          ? "undefined"
          : dates[example.getTime()],
      );
    }*/
    }
    return (
      <div
        className={`text flex h-full w-full items-center justify-center rounded-full 
          ${
            dates && dates[example.getTime()] !== undefined
              ? entry &&
                example.getTime() == new Date(entry.toString()).getTime()
                ? "bg-black"
                : dates[example.getTime()] + item > 25
                ? ""
                : dates[example.getTime()] + item > 10
                ? "bg-yellow-400"
                : "bg-green-400"
              : example.getTime() <
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime() &&
                example.getTime() > new Date(Date.now()).getTime()
              ? entry &&
                example.getTime() == new Date(entry.toString()).getTime()
                ? "bg-black"
                : item > 25
                ? ""
                : item > 10
                ? "bg-yellow-400"
                : "bg-green-400"
              : ""
          }
          `}
      >
        <div
          className={`
            ${
              dates && dates[example.getTime()] !== undefined
                ? entry &&
                  example.getTime() == new Date(entry.toString()).getTime()
                  ? "text-white underline"
                  : dates[example.toLocaleDateString()] + item > 25
                  ? "text-black"
                  : "text-white"
                : example.getTime() <
                    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).getTime() &&
                  example.getTime() > new Date(Date.now()).getTime()
                ? entry &&
                  example.getTime() == new Date(entry.toString()).getTime()
                  ? "text-white underline"
                  : item > 25
                  ? "text-black"
                  : "text-white"
                : ""
            }
            `}
        >
          {date.day}
        </div>
      </div>
    );
  };
  function isDisabled() {
    if (entry && disabledDates) {
      for (let i in disabledDates) {
        if (
          entry &&
          disabledDates[i].getTime() == new Date(entry.toString()).getTime()
        ) {
          entry.toLocaleString();
          return true;
        }
      }
      return false;
    }
  }

  //${date.day == 30 ? "bg-green-400" : "bg-red-500"}

  return (
    <div className="block items-center overflow-hidden pt-5 lg:pt-25">
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
                minDate={minDate}
                maxDate={maxDate}
                dateTemplate={dateTemplate}
                disabledDates={disabledDates}
              />
            </div>
            <div className="mt-2 w-full justify-center pl-2 md:flex md:pl-0">
              <div className="mt-2 flex">
                <div className="w-6 rounded-full bg-green-500"></div>{" "}
                <div className="ml-1 font-medium"> : Available</div>
              </div>
              <div className="mt-2 flex">
                <div className="w-6 rounded-full bg-yellow-400 md:ml-3"> </div>{" "}
                <div className="ml-1 font-medium"> : Selling fast</div>
              </div>
              {/*<div className="mt-2 flex">
                <div className="w-6 rounded-full bg-red-500 md:ml-3"> </div>{" "}
                <div className="ml-1 font-medium"> : Running out!</div>
              </div>*/}
            </div>
            {isDisabled() && (
              <div className=" mt-3 flex w-full">
                <div className="flex h-8 w-full items-center justify-center bg-red-100 text-justify text-sm text-red-600">
                  The date you choose is not available!
                </div>
              </div>
            )}
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
        ) : !isDisabled() ? (
          <div className="justify-right w-2/5 lg:w-1/5">
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
        ) : (
          <div className="justify-right w-2/5 lg:w-1/5">
            <div className="w-full">
              <Button className="disabled w-full rounded">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default SelectDateForm;
