import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import RetryForm from "../../components/TicketManagement/RetryForm";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Appearance } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function CompletionPage() {
  const { customerOrderId, code, id } = useParams();
  console.log(customerOrderId, code, id);
  const apiJson = useApiJson();
  const [error, setError] = useState<boolean | null>(null);
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>("");
  const navigate = useNavigate();

  const appearance: Appearance = {
    theme: "stripe",
  };
  const options: StripeElementsOptions | undefined = {
    clientSecret,
    appearance,
  };

  useEffect(() => {
    apiJson.get("http://localhost:3000/config").then(async (r) => {
      console.log(r);
      const publishableKey = r.publishableKey;
      console.log(loadStripe(publishableKey));
      setStripePromise(await loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    let payment: any;
    apiJson
      .post("http://localhost:3000/fetchPayment", { id: id })
      .catch((error) => {
        console.log(error);
        setError(true);
      })
      .then((res) => {
        if (res.status === "succeeded") {
          payment = {
            amount: res.amount / 100,
            time: new Date(),
            paymentType: res.type,
            transactionId: id,
            description: res.description,
          };
          if (Number(code) === 1) {
            console.log("here?");
            apiJson
              .post(
                `http://localhost:3000/api/customer/completePaymentForCustomer/${customerOrderId}`,
                { payment },
              )
              .catch((error) => {
                console.log(error);
                setError(true);
              })
              .then((res) => {
                setError(false);
                navigate("/success");
              });
          } else {
            console.log("or here?");
            apiJson
              .post(
                `http://localhost:3000/api/customer/completePaymentForGuest/${customerOrderId}`,
                { payment },
              )
              .catch((error) => {
                console.log(error);
                setError(true);
              })
              .then((res) => {
                setError(false);
                navigate("/success");
              });
          }
        } else {
          setError(true);
          setClientSecret(res.secret);
        }
      });
  }, []);

  return (
    <div className="pt-20">
      {error === null && (
        <div className="flex justify-center pt-50 text-2xl">
          Processing your payment....
        </div>
      )}

      {error === true && (
        <Elements options={options} stripe={stripePromise}>
          <RetryForm
            customerOrderId={Number(customerOrderId)}
            code={code}
            id={id}
          />
        </Elements>
      )}
    </div>
  );
}

export default CompletionPage;
