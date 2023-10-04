import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "primereact/calendar";
import { CalendarChangeEvent } from "primereact/calendar";
import Listing from "../../models/Listing";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
function SelectDateForm() {
  const location = useLocation();
  const localListingList: Listing[] = location.state.localListingList;
  const foreignerListingList: Listing[] = location.state.foreignerListingList;
  const entryDate: Date = location.state.entryDate;
  const [entry, setEntry] = useState<string | Date | Date[] | null>(
    new Date(entryDate),
  );

  console.log(localListingList);
  return (
    <div className="block items-center overflow-hidden pt-5 lg:pt-15">
      <div className="m-0 mb-7 px-5 text-2xl font-bold md:mb-5 lg:px-20">
        2. Select Date
      </div>
      <div className="mt-0 block w-screen items-center justify-center md:flex">
        <div className="mb-5 flex w-screen items-center justify-center px-5 lg:px-20">
          <div className="lg:md-50 w-full items-center justify-center md:mt-0">
            <div className="items-center justify-center bg-red-200">
              <h2 className="flex justify-center text-2xl font-bold">Date</h2>
            </div>
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
              />
            </div>
          </div>
        </div>
        <div className="mb-5 mt-10 flex w-screen items-center justify-center px-5 pb-5 lg:px-20">
          <Card className="w-full items-center justify-center lg:mt-0">
            <CardHeader className="items-center justify-center">
              <CardTitle className="text-2xl font-bold">
                Foreign Resident?
              </CardTitle>
            </CardHeader>
            <CardContent>YEYYYYY</CardContent>
          </Card>
        </div>
      </div>
      <div className="flex">
        <div className="mb-5 flex w-screen justify-end pr-5 text-2xl font-bold lg:pr-20">
          <NavLink
            to="/tickets/selectDate"
            state={{ localListingList, foreignerListingList, entryDate }}
          >
            <Button className="w-20 rounded">Next</Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
export default SelectDateForm;
