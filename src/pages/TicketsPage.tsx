import React from "react";
import CustOrGuest from "../components/TicketManagement/CustOrGuestPage";
import { useAuthContext } from "../hooks/useAuthContext";
import ListingPage from "./PurchaseTicketManagement/ListingPage";
import { Navigate } from "react-router-dom";

function TicketsPage() {
  const { state } = useAuthContext();
  const { user } = state;
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 pb-14">
      {!user ? <CustOrGuest /> : <Navigate to={"/tickets/selectListing"} />}
    </div>
  );
}

export default TicketsPage;
