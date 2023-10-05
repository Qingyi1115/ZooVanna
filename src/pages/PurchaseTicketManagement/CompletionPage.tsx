import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function CompletionPage() {
  const { customerOrderId, code, id } = useParams();
  console.log(customerOrderId, code, id);
  const apiJson = useApiJson();

  useEffect(() => {
    let payment: any;
    apiJson
      .post("http://localhost:3000/fetchPayment", { id: id })
      .catch((error) => console.log(error))
      .then((res) => {
        console.log(res);
        payment = {
          amount: res.amount,
          time: new Date(),
          paymentType: res.type,
          transactionId: id,
          description: res.description,
        };
      })
      .then(() => {
        if (Number(code) === 1) {
          apiJson
            .post(
              `http://localhost:3000/api/customer/completePaymentForCustomer/${customerOrderId}`,
              { payment },
            )
            .catch((error) => console.log(error));
        } else {
          apiJson
            .post(
              `http://localhost:3000/api/customer/completePaymentForGuest/${customerOrderId}`,
              { payment },
            )
            .catch((error) => console.log(error));
        }
      });
  }, []);
  return (
    <div className="pt-80">
      <div className="ml-35 text-2xl font-bold">Well done!</div>
      <div className="mt-5 px-35">
        <NavLink to="/">
          <Button className="w-full">Home</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default CompletionPage;
