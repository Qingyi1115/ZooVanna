import { useEffect, useState } from "react";
import ViewProfileForm from "../components/AccountPage/ViewProfileForm";
import useApiJson from "../hooks/useApiJson";
import { useAuthContext } from "../hooks/useAuthContext";
import Customer from "../models/Customer";

function ViewEditProfilePage() {
  const { state } = useAuthContext();
  const { user } = state;
  let email: string = user ? user.email : "";
  console.log("User in view edit profile page: " + user?.email + user?.token);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  const apiJson = useApiJson();

  //   const customer = await apiJson.get(
  //     "http://${localhost_address}/api/customer/getCustomer",
  //     email,
  //   );

  let emptyCustomer: Customer = {
    customerId: -1,
    firstName: "",
    lastName: "",
    email: "",
    contactNo: "",
    birthday: new Date(),
    address: "",
    nationality: "",
  };

  const [currCustomer, setCurrCustomer] = useState<Customer>(emptyCustomer);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/customer/getCustomer`,
        );
        setCurrCustomer(responseJson as Customer);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchCustomerData();
    // console.log(currCustomer);
  }, []);

  return (
    <div className="p-10">
      {currCustomer.customerId !== -1 && (
        <ViewProfileForm currCustomer={currCustomer} />
      )}
    </div>
  );
}

export default ViewEditProfilePage;

//   useEffect(() => {
//     apiJson.get("http://${localhost_address}/api/customer/getCustomer", email);
//   }, []);

//   useEffect(() => {
//     console.log(apiJson.result);
//     const customer = apiJson.result as Customer;
//     console.log(customer);
//     setCurrCustomer(customer);
//     console.log(currCustomer);
//   }, [apiJson.loading]);

//   useEffect(() => {
//     async function fetchCustomerData() {
//       try {
//         const response = await apiJson.get(
//           "http://${localhost_address}/api/customer/getCustomer",
//           email,
//         );
//         console.log(response);
//         const customer = response.result as Customer;
//         console.log(customer);
//         setCurrCustomer(customer);
//       } catch (error) {
//         // Handle the error here
//         console.error("Error fetching customer data:", error);
//       }
//     }

//     fetchCustomerData();
//   }, []);

//   useEffect(() => {
//     const customer = apiJson.result as Customer;
//     setCurrCustomer(customer);
//   }, [apiJson.loading]);
