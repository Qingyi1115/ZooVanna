import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RetryForm from "../../components/TicketManagement/RetryForm";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Appearance } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { App, URLOpenListenerEvent } from "@capacitor/app";
import useApiJson from "../../hooks/useApiJson";

function CompletionPage() {
  const { customerOrderId, code, id } = useParams();
  console.log(customerOrderId, code, id);
  const apiJson = useApiJson();
  const [error, setError] = useState<boolean | null>(null);
  const [stripePromise, setStripePromise] = useState<Stripe | null>(null);
  const [clientSecret, setClientSecret] = useState<string | undefined>("");
  const navigate = useNavigate();

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

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
    let payment: any;
    apiJson
      .post(`http://${localhost_address}/fetchPayment`, { id: id })
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
                `http://${localhost_address}/api/customer/completePaymentForCustomer/${customerOrderId}`,
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
                `http://${localhost_address}/api/customer/completePaymentForGuest/${customerOrderId}`,
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
