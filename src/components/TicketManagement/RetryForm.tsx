import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

interface RetryFormProps {
  customerOrderId: number;
  code: string | undefined;
  id: string | undefined;
}
function RetryForm(props: RetryFormProps) {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const toastShadcn = useToast().toast;
  const customerOrderId = props.customerOrderId;
  const code = props.code;
  const id = props.id;

  async function handleProcessing() {
    handlePayment(Number(customerOrderId));
  }

  async function handlePayment(customerOrderId: number | null) {
    const localhost_address = import.meta.env.VITE_LOCALHOST_5174_ADDRESS;
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://${localhost_address}/tickets/completion/${customerOrderId}/${code}/${id}`,
      },
    });
    if (error) {
      toastShadcn({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      console.log(customerOrderId);
    } else {
      toastShadcn({
        title: "Successful",
        description: "Your payment has been succesfully completed!",
      });
    }

    setIsProcessing(false);
  }
  return (
    <>
      <div className="m-0 mb-7 px-5 text-2xl font-bold md:mb-5 lg:px-20">
        Retry payment
      </div>
      <div className="px-5 lg:px-20">
        <PaymentElement />
        <div className="mt-5 flex w-full justify-end">
          <Button
            className="w-full md:w-1/5 lg:w-1/5"
            onClick={handleProcessing}
            disabled={isProcessing}
          >
            <span>{isProcessing ? "Processing..." : "Pay"}</span>
          </Button>
        </div>
      </div>
    </>
  );
}
export default RetryForm;
