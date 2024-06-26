import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useApiJson from "../hooks/useApiJson";
import { useAuthContext } from "../hooks/useAuthContext";
import Customer from "../models/Customer";
import Listing from "../models/Listing";

function TicketsPage() {
  const { state } = useAuthContext();
  const { user } = state;
  const [localListingList, setLocalListingList] = useState<Listing[]>();
  const [foreignerListingList, setForeignerListingList] = useState<Listing[]>();
  const apiJson = useApiJson();
  const entryDate = new Date(Date.now());
  entryDate.setHours(0, 0, 0);
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  let personal: any = {
    customerFirstName: "",
    customerLastName: "",
    customerContactNo: "",
    customerEmail: "",
  };

  useEffect(() => {
    apiJson
      .get(`http://${localhost_address}/api/listingCustomer/getLocalListings`)
      .catch((err: any) => console.log(err))
      .then((res: any) => {
        console.log("local" + res);
        setLocalListingList(res.result as Listing[]);
      });
  }, []);

  useEffect(() => {
    apiJson
      .get(
        `http://${localhost_address}/api/listingCustomer/getForeignerListings`,
      )
      .catch((err: any) => console.log(err))
      .then((res: any) => {
        console.log(res);
        setForeignerListingList(res.result as Listing[]);
      });
  }, []);

  useEffect(() => {
    if (user) {
      apiJson
        .get(`http://${localhost_address}/api/customer/getCustomer`)
        .catch((err: any) => console.log(err))
        .then((res: any) => {
          console.log(res);
          let customer = res as Customer;
          personal.customerFirstName = customer.firstName;
          personal.customerLastName = customer.lastName;
          personal.customerContactNo = customer.contactNo;
          personal.customerEmail = customer.email;
        });
    }
  }, []);

  window.onbeforeunload = function () {
    return "Data will be lost if you refresh the page. Are you sure?";
  };
  return (
    <div className="flex items-center justify-center overflow-hidden pb-5 pt-10 lg:pt-40">
      {localListingList &&
        foreignerListingList &&
        (!user ? (
          <Navigate
            to={"/tickets/custOrGuest"}
            state={{
              localListingList,
              foreignerListingList,
              entryDate,
              personal,
            }}
          />
        ) : (
          <Navigate
            to={"/tickets/selectListing/listingForm"}
            state={{
              localListingList,
              foreignerListingList,
              entryDate,
              personal,
            }}
          />
        ))}
    </div>
  );
}

export default TicketsPage;
