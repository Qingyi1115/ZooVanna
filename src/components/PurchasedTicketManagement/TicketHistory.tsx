import { useEffect, useState } from "react";
import useApiJson from "../../hooks/useApiJson";
import CustomerOrderCard from "./CustomerOrderCard";
import CustomerOrder from "../../models/CustomerOrder";

function TicketHistory() {
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  const apiJson = useApiJson();
  const [custOrders, setCustOrders] = useState<CustomerOrder[]>();
  //put use Effect for upcoming ticket here

  useEffect(() => {
    apiJson
      .get(
        `http://${localhost_address}/api/customerOrder/getPastCustomerOrderByCustomer`,
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
