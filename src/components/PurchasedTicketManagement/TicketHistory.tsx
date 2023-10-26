import { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import CustomerOrderCard from "./CustomerOrderCard";
import CustomerOrder from "../../models/CustomerOrder";

function TicketHistory() {
  const apiJson = useApiJson();
  const [custOrders, setCustOrders] = useState<CustomerOrder[]>();
  //put use Effect for upcoming ticket here

  useEffect(() => {
    apiJson
      .get(
        "http://localhost:3000/api/customerOrder/getPastCustomerOrderByCustomer",
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
export default TicketHistory;
