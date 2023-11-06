import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
//import LoggedInCardContent from "../../components/AccountPage/LoggedInCardContent";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Listing from "../../models/Listing";
import LoginPurchaseForm from "../AccountPage/LoginPurchaseForm";

function CustOrGuest() {
  const location = useLocation();
  const [localListingList, setLocalListingList] = useState<Listing[]>(
    location.state.localListingList,
  );
  const [foreignerListingList, setForeignerListingList] = useState<Listing[]>(
    location.state.foreignerListingList,
  );
  const entryDate = location.state.entryDate;
  const personal = location.state.personal;

  return (
    <div className="block h-full items-center overflow-hidden pt-15 lg:flex lg:pt-0">
      <div className=" flex w-screen items-center justify-center px-5 lg:px-10">
        <Card className="lg:md-50 w-full items-center justify-center md:mt-0">
          <CardHeader className="items-center justify-center">
            <CardTitle>Continue As Guest</CardTitle>
          </CardHeader>
          <CardContent className="p-auto items-center justify-center">
            <div className="mb-5">
              You can buy ticket without creating an account!
            </div>
            <NavLink
              to="/tickets/selectListing/listingForm"
              state={{
                localListingList,
                foreignerListingList,
                entryDate,
                personal,
              }}
            >
              <Button className="w-full">Continue as guest</Button>
            </NavLink>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10 flex w-screen items-center justify-center px-5 pb-5 lg:px-20">
        {/* can force a reload upon successful log in using
          window.location.reload(); */}
        <Card className="w-full items-center justify-center lg:mt-0">
          <CardHeader className="items-center justify-center">
            <CardTitle>Have an account? Log in</CardTitle>
            {/* <CardDescription>
                Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="h-auto w-auto items-center justify-center">
            <LoginPurchaseForm
              localListingList={localListingList}
              foreignerListingList={foreignerListingList}
              entry={entryDate}
              personal={personal}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CustOrGuest;
