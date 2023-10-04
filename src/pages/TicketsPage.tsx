import React from "react";
import CustOrGuest from "../components/TicketManagement/CustOrGuestPage";
import { useAuthContext } from "../hooks/useAuthContext";
import ListingPage from "./PurchaseTicketManagement/ListingPage";
import { Navigate } from "react-router-dom";

function TicketsPage() {
  const { state } = useAuthContext();
  const { user } = state;
  return (
    <div className="flex items-center justify-center overflow-hidden pb-5 pt-10 lg:pt-40">
      {!user ? <CustOrGuest /> : <Navigate to={"/tickets/selectListing"} />}
    </div>
  );
}

export default TicketsPage;
