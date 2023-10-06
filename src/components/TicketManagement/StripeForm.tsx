import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { StripeError } from "@stripe/stripe-js";
import Listing from "src/models/Listing";
import { useAuthContext } from "../../hooks/useAuthContext";
import useApiJson from "../../hooks/useApiJson";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Customer from "../../models/Customer";

interface StripeFormProps {
  localListingList: Listing[];
  foreignerListingList: Listing[];
  entry: Date;
  total: number;
  personal: any;
  toastShadcn: any;
  id: string;
}

function StripeForm(props: StripeFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const listings = [...props.localListingList, ...props.foreignerListingList];
  const entry = props.entry;
  const total = props.total;
  const personal = props.personal;
  const apiJson = useApiJson();
  const [customer, setCustomer] = useState<Customer>();
  const toastShadcn = props.toastShadcn;
  const [customerOrderId, setCustomerOrderId] = useState<number | null>(null);
  let code: number;
  const id = props.id;

  const { state } = useAuthContext();
  const { user } = state;

  if (user) {
    code = 1;
  } else {
    code = 0;
  }

  useEffect(() => {
    if (user) {
      apiJson
        .post("http://localhost:3000/api/customer/getCustomer", {
          email: user.email,
        })
        .catch((error) => {
          console.log(error);
          toastShadcn({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              "An error has occurred while retrieving customer \n" + error,
          });
        })
        .then((res) => {
          console.log(res);
          setCustomer(res);
        });
      console.log(customer);
    }
  }, []);

  async function handleProcessing() {
    let customerOrder;
    console.log(customerOrderId);
    if (!customerOrderId) {
      if (!user || !customer) {
        customerOrder = {
          bookingReference: uuidv4(),
          totalAmount: total,
          orderStatus: "ACTIVE",
          entryDate: entry,
          customerFirstName: personal.customerFirstName,
          customerLastName: personal.customerLastName,
          customerContactNo: personal.customerContactNo,
          customerEmail: personal.customerEmail,
          paymentStatus: "PENDING",
        };

        apiJson
          .post(
            "http://localhost:3000/api/customer/createCustomerOrderForGuest",
            {
              listings: listings,
              customerOrder: customerOrder,
            },
          )
          .catch((err) => {
            console.log(err);
            toastShadcn({
              variant: "destructive",
              title: "Uh oh! Something went wrong.",
              description:
                "An error has occurred while creating customer order: \n" + err,
            });
          })
          .then((res) => {
            console.log(res);
            console.log(res.result.customerOrderId);
            setCustomerOrderId(res.result.customerOrderId);
            console.log(customerOrderId);
          })
          .then(() => {
            console.log(customerOrderId);
            handlePayment();
          });
      } else {
        if (customer && user) {
          customerOrder = {
            bookingReference: uuidv4(),
            totalAmount: total,
            orderStatus: "ACTIVE",
            entryDate: entry,
            customerFirstName: customer.firstName,
            customerLastName: customer.lastName,
            customerContactNo: customer.contactNo,
            customerEmail: customer.email,
            paymentStatus: "PENDING",
          };
          apiJson
            .post(
              "http://localhost:3000/api/customer/createCustomerOrderForCustomer",
              {
                email: user.email,
                listings: listings,
                customerOrder: customerOrder,
              },
            )
            .catch((err) => {
              console.log(err);
              toastShadcn({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description:
                  "An error has occurred while creating customer order: \n" +
                  err,
              });
            })
            .then((res) => {
              console.log(res);
              console.log(res.result);
              console.log(res.result.customerOrderId);
              setCustomerOrderId(res.result.customerOrderId);
              console.log(customerOrderId);
            })
            .then(() => {
              console.log(customerOrderId);
              handlePayment();
            });
        }
      }
    } else {
      handlePayment();
    }
  }

  async function handlePayment() {
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5174/tickets/completion/${customerOrderId}/${code}/${id}`,
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
    <div>
      <PaymentElement />
      <div className="mt-5 flex w-full md:justify-end">
        <Button
          className="w-full md:w-1/5 lg:w-20"
          onClick={handleProcessing}
          disabled={isProcessing}
        >
          <span>{isProcessing ? "Processing..." : "Pay"}</span>
        </Button>
      </div>
    </div>
  );
}
export default StripeForm;
