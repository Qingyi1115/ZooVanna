import { Button } from "@/components/ui/button";
import React from "react";
import PromotionCardsContainer from "../components/HomePage/Promotion/PromotionCardsContainer";
import LocalListingTable from "../components/TicketManagement/LocalListingTable";
import { NavLink } from "react-router-dom";
import ForeignListingTable from "../components/TicketManagement/ForeignListingTable";

function HomePage() {
  return (
    <div className="flex h-full flex-col p-6">
      {/* <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="link">Link</Button> */}
      <div className="mb-3 pt-4">
        <h1 className="text-2xl font-bold">Ticket Pricing</h1>
      </div>
      <div className="mb-5">
        <div className="mb-3 pt-4">
          <h1 className="text-xl font-extrabold">Local Resident</h1>
        </div>
        <LocalListingTable />
      </div>

      <div className="mb-8">
        <div className="mb-3 pt-4">
          <h1 className="text-xl font-extrabold">Non Residents</h1>
        </div>
        <ForeignListingTable />
      </div>

      <div className="md:justify- w-full ">
        <NavLink to={"/tickets/buy"}>
          <Button className="mr-2 w-full md:w-1/5">Buy Now</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default HomePage;
