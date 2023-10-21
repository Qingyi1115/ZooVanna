import Listing from "../../models/Listing";
import { Form, useLocation } from "react-router-dom";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import DateFormSummary from "./DateFormSummary";
import { Button } from "@/components/ui/button";
import StripeForm from "./StripeForm";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import { useToast } from "@/components/ui/use-toast";
import {
  Appearance,
  Stripe,
  StripeElementsOptions,
  loadStripe,
} from "@stripe/stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import { Elements } from "@stripe/react-stripe-js";
const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

function PaymentForm() {
  const location = useLocation();
  const localListingList: Listing[] = location.state.localListingList;
  const foreignerListingList: Listing[] = location.state.foreignerListingList;
  const entry: Date = location.state.entry;
  const total: number = location.state.total;
  const item: number = location.state.item;
  const personal: any = location.state.personal;
  const isChecked: boolean = location.state.isChecked;
  const initialOptions = {
    clientId: "test",
    currency: "USD",
    intent: "capture",
  };

  const handleBeforeUnload = (event: any) => {
    // You can provide a custom message here if needed
    event.returnValue = ""; // Set an empty string to prevent the confirmation dialog
  };

  useEffect(() => {
    // Attach the event listener when the component mounts
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const toast = useRef<Toast>(null);
  const toastShadcn = useToast().toast;

  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const apiJson = useApiJson();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentIntentId, setPaymentIntentId] = useState<string>("");

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions | undefined = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    apiJson.get(`http://${localhost_address}/config`).then(async (r) => {
      console.log(r);
      const publishableKey = r.publishableKey;
      console.log(loadStripe(publishableKey));
      setStripePromise(await loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    console.log(total);
    apiJson
      .post(`http://${localhost_address}/create-payment-intent`, {
        total: total,
      })
      .catch((error) => {
        console.log(error);
      })
      .then(async (r) => {
        setClientSecret(r.clientSecret);
        setPaymentIntentId(r.id);
      });
  }, []);

  console.log(stripePromise, clientSecret);

  return (
    <div className="h-screen">
      <div className="m-0 mb-7 mt-10 px-10 pt-5 text-2xl font-bold sm:px-20  md:mb-5 md:pt-30">
        Payment
      </div>
      <div className="w-full px-10 sm:px-20">
        {stripePromise && clientSecret && paymentIntentId && (
          <Elements options={options} stripe={stripePromise}>
            <StripeForm
              localListingList={localListingList}
              foreignerListingList={foreignerListingList}
              entry={entry}
              total={total}
              personal={personal}
              toastShadcn={toastShadcn}
              id={paymentIntentId}
            />
          </Elements>
        )}
      </div>
    </div>
  );
}
export default PaymentForm;
