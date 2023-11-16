import { Button } from "@/components/ui/button";
import * as Form from "@radix-ui/react-form";
import { Calendar, CalendarChangeEvent } from "primereact/calendar";
import { useState } from "react";

interface itineraryProps {
  itineraryName: string | undefined;
  setItineraryName: any;
  plannedDateVisit: string | Date | Date[] | null;
  setPlannedDateVisit: any;
  pageNumber: number;
  setPageNumber: any;
}
function BasicItineraryForm(props: itineraryProps) {
  const {
    itineraryName,
    setItineraryName,
    plannedDateVisit,
    setPlannedDateVisit,
    pageNumber,
    setPageNumber,
  } = props;
  const [error, setError] = useState<any>();
  const today = new Date(Date.now());
  today.setHours(0, 0, 0);
  function validateItineraryName(props: ValidityState) {
    if (props != undefined) {
      if (props.valueMissing) {
        return (
          <div className="font-medium text-red-600">* Please enter a name!</div>
        );
      }
    }
    return null;
  }
  function handleSubmit() {
    setPageNumber(pageNumber + 1);
  }
  return (
    <div>
      <div className="text-2xl font-bold">1. Itinerary Details</div>
      <div className="pt-5">
        <Form.Root className="w-full" onSubmit={handleSubmit}>
          <Form.Field name="email" className="mb-5 flex flex-col gap-1">
            <Form.Label className="text-base font-medium text-black">
              Itinerary Name:
            </Form.Label>
            <Form.Control
              type="name"
              required
              placeholder="Type your Itinerary name"
              value={itineraryName}
              onChange={(e) => setItineraryName(e.target.value)}
              className="h-14 w-full rounded-md border border-zoovanna-brown/50 bg-whiten px-4 text-black placeholder-black/70"
            />
            {/* <Form.Message name="email" match={"valueMissing"}>
            Please enter an email
          </Form.Message> */}
            <Form.ValidityState>{validateItineraryName}</Form.ValidityState>
          </Form.Field>

          <div className="card justify-content-center mb-5 flex flex-col">
            <div className="pb-1 font-semibold">Planned Date Visit</div>

            <Calendar
              className="h-14 w-full appearance-none rounded-md border border-zoovanna-brown/50 bg-transparent placeholder-black/70"
              placeholder="Enter your date of birth"
              value={plannedDateVisit}
              onChange={(e: CalendarChangeEvent) => {
                if (e && e.value !== undefined) {
                  setPlannedDateVisit(e.value);
                  console.log(e.value);
                }
              }}
              minDate={today}
            />
          </div>

          <Form.Submit asChild>
            <div className="mt-5 flex w-full justify-end">
              <Button className="mt-5 w-2/5 rounded border bg-black text-whiter md:w-1/5">
                Next
              </Button>
            </div>
          </Form.Submit>
          {error && (
            <div className="m-2 border-red-400 bg-red-100 p-2">{error}</div>
          )}
        </Form.Root>
      </div>
    </div>
  );
}

export default BasicItineraryForm;
