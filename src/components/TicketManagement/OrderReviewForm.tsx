import Listing from "../../models/Listing";
import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DateFormSummary from "./DateFormSummary";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { InputText } from "primereact/inputtext";

function OrderReviewForm() {
  const location = useLocation();
  const localListingList: Listing[] = location.state.localListingList;
  const foreignerListingList: Listing[] = location.state.foreignerListingList;
  const entry: Date = location.state.entry;
  const total: number = location.state.total;
  const item: number = location.state.item;
  const personal: any = location.state.personal;
  const isChecked: boolean = location.state.isChecked;
  console.log(personal);

  const { state } = useAuthContext();
  const { user } = state;

  return (
    <div className="block lg:pt-25">
      <div className="mb-5 mt-10 block w-screen items-center justify-center px-5 pb-5 sm:px-20 md:pt-5 lg:flex lg:pt-0">
        <div className="m-0 mb-5 text-2xl font-bold md:mb-5 lg:px-20">
          Order Review
        </div>
        <div className="w-full">
          <Card className="w-full items-center justify-between lg:mt-0">
            <CardHeader className="flex justify-between">
              <CardTitle className="flex justify-between text-2xl font-bold">
                <div>Total Payable:</div>
                <div>S${total}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex justify-between">
                <div className="flex text-xl">Price:</div>
                <div className="flex">S${total}</div>
              </div>
              <Separator className="opacity-20" />
              <div className="flex justify-between">
                <div className="flex">ZooVanna</div>
                <div className="flex">{item}</div>
              </div>
              <div>{entry.toLocaleDateString()}</div>
              <div className="mt-5">
                <div className="text-2xl font-bold">Admissions</div>
                <div className="my-1">ZooVanna admission</div>
                <Separator className="opacity-20" />
                {localListingList?.map(
                  (listing) =>
                    listing.orderItems.length > 0 && (
                      <DateFormSummary listing={listing} />
                    ),
                )}
                {foreignerListingList?.map(
                  (listing) =>
                    listing.orderItems.length > 0 && (
                      <DateFormSummary listing={listing} />
                    ),
                )}
              </div>
              <Separator className="opacity-20" />
            </CardContent>
          </Card>
        </div>
        <div className="mt-10 block w-full items-center justify-center lg:ml-40 lg:mt-0 lg:flex ">
          <Card className="lg:md-50 h-45 w-full items-center justify-center md:mt-0">
            <CardHeader className="items-center justify-center">
              <CardTitle className="mb-1 text-2xl font-bold">
                Promotion Code
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <InputText className="h-11 w-3/4" />
              <Button className="h-11 w-1/4">Apply</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-5 flex w-screen justify-end px-5 text-2xl font-bold sm:px-20 ">
        {!user ? (
          <NavLink
            to="/tickets/personalDetails"
            state={{
              localListingList,
              foreignerListingList,
              entry,
              total,
              item,
              personal,
              isChecked,
            }}
            className="mr-5"
          >
            <Button className="w-20 rounded">Back</Button>
          </NavLink>
        ) : (
          <NavLink
            to="/tickets/selectDate"
            state={{
              localListingList,
              foreignerListingList,
              entry,
              total,
              item,
              personal,
              isChecked,
            }}
            className="mr-5"
          >
            <Button className="w-20 rounded">Back</Button>
          </NavLink>
        )}
        <NavLink
          to="/tickets/orderReview"
          state={{
            localListingList,
            foreignerListingList,
            entry,
            total,
            item,
            personal,
            isChecked,
          }}
          className="flex bg-red-100"
        >
          <Button className="w-20 w-full rounded">Pay now</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default OrderReviewForm;
