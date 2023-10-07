import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ListingForm from "../../components/TicketManagement/ListingForm";
import { Button } from "@/components/ui/button";
import useApiJson from "../../hooks/useApiJson";
import { useState, useEffect } from "react";
import Listing from "../../models/Listing";
import SelectDateForm from "../../components/TicketManagement/SelectDateForm";
import Customer from "../../models/Customer";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";

function ListingPage() {
  const location = useLocation();
  let localListingList: Listing[] = location.state.localListingList;
  const foreignerListingList: Listing[] = location.state.foreignerListingList;
  const entryDate = location.state.entryDate;
  const personal = location.state.personal;

  console.log("here " + localListingList);

  return (
    <>
      <div className="flex items-center justify-center pb-5 pt-0">
        <Navigate
          to="/listingForm"
          state={{
            localListingList,
            foreignerListingList,
            entryDate,
            personal,
          }}
        />
      </div>
    </>
  );
}

export default ListingPage;
