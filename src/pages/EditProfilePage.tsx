import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useApiJson from "../hooks/useApiJson";
import Customer from "../models/Customer";
import { Country } from "../enums/Country";
import EditProfileForm from "../components/AccountPage/EditProfileForm";
import { useAuthContext } from "../hooks/useAuthContext";
import ViewProfileForm from "../components/AccountPage/ViewProfileForm";

function EditProfilePage() {
  const { state } = useAuthContext();
  const { user } = state;
  let email: string = user ? user.email : "";
  //   console.log("User in view edit profile page: " + user?.email + user?.token);

  const apiJson = useApiJson();

  //   const customer = await apiJson.get(
  //     "http://localhost:3000/api/customer/getCustomer",
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
          "http://localhost:3000/api/customer/getCustomer",
          email,
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
        <EditProfileForm currCustomer={currCustomer} />
      )}
    </div>
  );
}

export default EditProfilePage;

//   useEffect(() => {
//     apiJson.get("http://localhost:3000/api/customer/getCustomer", email);
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
//           "http://localhost:3000/api/customer/getCustomer",
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
