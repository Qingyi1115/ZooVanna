import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import { useAuthContext } from "../../hooks/useAuthContext";
import Listing from "../../models/Listing";
import DateFormSummary from "./DateFormSummary";

function OrderReviewForm() {
  const location = useLocation();
  const localListingList: Listing[] = location.state.localListingList;
  const foreignerListingList: Listing[] = location.state.foreignerListingList;
  const entry: Date = location.state.entry;
  const total: number = location.state.total;
  const item: number = location.state.item;
  const personal: any = location.state.personal;
  const isChecked: boolean = location.state.isChecked;
  const [guestDialog, setGuestDialog] = useState<boolean>(false);

  const [isPromotionApplied, setIsPromotionApplied] = useState<boolean>(false);
  const [promotionCode, setPromotionCode] = useState<string>("");
  const [discount, setDiscount] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [finalTotal, setFinalTotal] = useState<number>(total);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  const apiJson = useApiJson();

  const toastShadcn = useToast().toast;

  const changePromotionCode = async () => {
    try {
      const packet = {
        currentSpending: total,
      };
      const response = await apiJson.put(
        `http://${localhost_address}/api/promotion/cancelUsePromotionCode/${promotionCode}`,
        packet,
      );
      setDiscount(0);
      setDiscountAmount(0);
      setFinalTotal(total);
      setIsPromotionApplied(false);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const applyPromotionCode = async () => {
    if (!promotionCode || !promotionCode.length) {
      return toastShadcn({
        variant: "destructive",
        title: "Promotion cannot be applied",
        description: "Please type in a promo code!",
      });
    }
    const packet = {
      currentSpending: total,
    };
    apiJson
      .put(
        `http://${localhost_address}/api/promotion/verifyPromotionCode/${promotionCode}`,
        packet,
      )
      .then((promotion) => {
        console.log("promotion", promotion);

        const discountPercentage: number = promotion.percentage;
        setDiscount(discountPercentage);
        console.log("Discount applied: " + discountPercentage);

        const discAmount: number = (discountPercentage / 100) * total;
        setDiscountAmount(discAmount);
        console.log("Discounted amount: " + discAmount);

        const finalTot: number = total - discAmount;
        setFinalTotal(finalTot);
        console.log("Final total: " + finalTot);

        setIsPromotionApplied(true);

        toastShadcn({
          title: "Promotion Applied Successfully",
          description: "Successfully applied promotion code",
        });
      })
      .catch((error) => {
        toastShadcn({
          variant: "destructive",
          title: "Promotion cannot be applied",
          description: error.message,
        });
      });
  };

  const handleGuestDialog = () => {
    setGuestDialog(true);
  };

  const hideGuestDialog = () => {
    setGuestDialog(false);
  };

  const guestDialogFooter = (
    <React.Fragment>
      <div className="">
        <Button onClick={hideGuestDialog}>No</Button>
        <NavLink
          to="/tickets/payment"
          state={{
            localListingList,
            foreignerListingList,
            entry,
            total: finalTotal,
            item,
            personal,
            isChecked,
          }}
          className=""
        >
          <Button>Yes</Button>
        </NavLink>
      </div>
    </React.Fragment>
  );

  console.log(personal);

  const { state } = useAuthContext();
  const { user } = state;

  return (
    <div className="block lg:pt-25">
      <div className="m-0 mb-7 mt-10 px-5 text-2xl font-bold sm:px-20 md:mb-5 ">
        Order Review
      </div>
      <div className="mb-5 mt-5 block w-screen items-center justify-center px-5 pb-5 sm:px-20 md:pt-5 lg:flex lg:pt-0">
        <div className="w-full">
          <Card className="w-full items-center justify-between lg:mt-0">
            <CardHeader className="flex justify-between">
              <CardTitle className="flex justify-between text-xl font-bold">
                <div>Total Payable:</div>
                <div>S${finalTotal}</div>
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex justify-between">
                <div className="text-l flex">Subtotal:</div>
                <div className="flex">S${total}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div className="text-l flex">Discount:</div>
                <div className="flex ">- S${discountAmount}</div>
              </div>
              <Separator className="opacity-20" />
              {/* <div className="flex justify-between">
                <div className="flex">Merlion Zoo</div>
                <div className="flex">{item}</div>
              </div> */}

              <div className="mt-5">
                <div className="text-xl font-bold">Admissions</div>
                <div className="flex justify-between">
                  <div className="flex">Merlion Zoo</div>
                  <div className="flex">{item} item(s)</div>
                </div>
                <div className="mb-2 text-xs">{entry.toLocaleDateString()}</div>
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
        <div className="mt-10 w-full items-center justify-center lg:ml-40 lg:mt-0">
          <Card className="lg:md-50 h-45 w-full items-center justify-center md:mt-0">
            <CardHeader className="items-center justify-center">
              <CardTitle className="mb-1 text-2xl font-bold">
                Promotion Code
              </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <InputText
                className="h-11 w-3/4"
                value={promotionCode}
                onChange={(e) => setPromotionCode(e.target.value)}
                placeholder="Enter promotion code"
                disabled={isPromotionApplied}
              />
              {isPromotionApplied ? (
                <Button
                  className="ml-2 h-11 w-1/4"
                  onClick={changePromotionCode}
                >
                  Change
                </Button>
              ) : (
                <Button
                  className="ml-2 h-11 w-1/4"
                  onClick={applyPromotionCode}
                >
                  Apply
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-5 flex w-screen justify-between px-5 text-2xl font-bold sm:px-20 ">
        {!user ? (
          <div className="justify-left w-2/5 md:w-2/5 lg:w-1/5">
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
            >
              <Button className="w-full rounded">Back</Button>
            </NavLink>
          </div>
        ) : (
          <div className="justify-left w-2/5 bg-red-500 md:w-2/5 lg:w-1/5">
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
            >
              <Button className="w-full rounded">Back</Button>
            </NavLink>
          </div>
        )}
        {user ? (
          <div className="w-2/5 md:w-2/5 lg:w-1/5">
            <NavLink
              to="/tickets/payment"
              state={{
                localListingList,
                foreignerListingList,
                entry,
                total: finalTotal,
                item,
                personal,
                isChecked,
              }}
            >
              <Button className="w-full rounded">Next</Button>
            </NavLink>
          </div>
        ) : (
          <div className=" flex w-2/5 md:w-2/5 lg:w-1/5">
            <Button
              className="w-full rounded"
              onClick={() => handleGuestDialog()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
      <Dialog
        visible={guestDialog}
        style={{ width: "25rem" }}
        breakpoints={{ "960px": "75vw", "641px": "90vw" }}
        header="Confirm"
        modal
        footer={guestDialogFooter}
        onHide={hideGuestDialog}
        className=""
      >
        <div className="confirmation-content flex w-full items-center justify-start pt-3">
          <i
            className="pi pi-exclamation-triangle mr-3"
            style={{ fontSize: "2rem" }}
          />
          <div className="ml-3">
            <div className="flex">Guest Email:</div>
            <div className="flex font-bold">{personal.customerEmail}</div>
            <div className="mt-2">Guest Phone Number:</div>
            <div className="font-bold">{personal.customerContactNo}</div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default OrderReviewForm;
