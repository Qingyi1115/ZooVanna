import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ListingForm from "../../components/TicketManagement/ListingForm";
import { Button } from "@/components/ui/button";
import useApiJson from "../../hooks/useApiJson";
import { useState, useEffect } from "react";
import Listing from "../../models/Listing";
import SelectDateForm from "../../components/TicketManagement/SelectDateForm";

function ListingPage() {
  const [localListingList, setLocalListingList] = useState<Listing[]>();
  const [foreignerListingList, setForeignerListingList] = useState<Listing[]>();
  const apiJson = useApiJson();
  const entryDate = new Date(Date.now());

  useEffect(() => {
    apiJson
      .get("http://localhost:3000/api/listingCustomer/getLocalListings")
      .catch((err) => console.log(err))
      .then((res) => {
        console.log(res);
        setLocalListingList(res.result as Listing[]);
      });
  }, []);

  useEffect(() => {
    apiJson
      .get("http://localhost:3000/api/listingCustomer/getForeignerListings")
      .catch((err) => console.log(err))
      .then((res) => {
        console.log(res);
        setForeignerListingList(res.result as Listing[]);
      });
  }, []);

  window.onbeforeunload = function () {
    return "Data will be lost if you refresh the page. Are you sure?";
  };
  return (
    <>
      <div className="flex items-center justify-center pb-5 pt-0">
        <ListingForm
          localListingList={localListingList}
          foreignerListingList={foreignerListingList}
          entryDate={entryDate}
        />
      </div>
    </>
  );
}

export default ListingPage;
