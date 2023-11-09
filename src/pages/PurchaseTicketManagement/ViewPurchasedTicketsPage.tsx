import { Button } from "@/components/ui/button";
import { useState } from "react";
import TicketHistory from "../../components/PurchasedTicketManagement/TicketHistory";
import UpcomingTicket from "../../components/PurchasedTicketManagement/UpcomingTicket";

function ViewPurchasedTicketsPage() {
  const [selectedType, setSelectedType] = useState("Upcoming");

  function handleUpcoming() {
    setSelectedType("Upcoming");
  }

  function handlePast() {
    setSelectedType("Past");
  }
  return (
    <div className="h[-96%] w-full items-center justify-center pb-5 pt-10">
      <div className="m-0 mb-5 px-5 text-2xl font-bold md:mb-5 lg:px-20">
        Bookings
      </div>

      <div className="m-0 flex h-full px-5 lg:px-20">
        <Button
          className={`text-md w-20 rounded-none bg-transparent text-black hover:bg-transparent ${
            selectedType == "Upcoming" ? "border-b-2 border-black" : ""
          } `}
          onClick={handleUpcoming}
        >
          Upcoming
        </Button>
        <Button
          className={`text-md ml-4 rounded-none bg-transparent text-black hover:bg-transparent ${
            selectedType == "Past" ? "border-b-2 border-black" : ""
          } `}
          onClick={handlePast}
        >
          Past
        </Button>
      </div>
      <div className="m-0 flex h-full w-full px-5 pt-5 lg:px-20">
        {selectedType == "Upcoming" ? <UpcomingTicket /> : <TicketHistory />}
      </div>
    </div>
  );
}

export default ViewPurchasedTicketsPage;
