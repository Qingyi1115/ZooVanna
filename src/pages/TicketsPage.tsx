import React from "react";
import CustOrGuest from "../components/TicketManagement/CustOrGuestPage";

function TicketsPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 pb-14">
      <CustOrGuest />
    </div>
  );
}

export default TicketsPage;
