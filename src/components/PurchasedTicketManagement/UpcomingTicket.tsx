import { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import CustomerOrder from "../../models/CustomerOrder";
import CustomerOrderCard from "./CustomerOrderCard";

function UpcomingTicket() {
  const apiJson = useApiJson();
  const [custOrders, setCustOrders] = useState<CustomerOrder[]>();
  //put use Effect for upcoming ticket here

  useEffect(() => {
    apiJson
      .get(
        "http://localhost:3000/api/customerOrder/getAllUpcomingCustomerOrderByCustomer",
      )
      .then((result) => setCustOrders(result.result));
  }, []);

  return (
    <div className="w-full">
      {custOrders?.map((result) => (
        <CustomerOrderCard customerOrder={result} payments={result.payments} />
      ))}
    </div>
  );
}

export default UpcomingTicket;
