import { useEffect, useState } from "react";
import ViewProfileForm from "../components/AccountPage/ViewProfileForm";
import useApiJson from "../hooks/useApiJson";
import { useAuthContext } from "../hooks/useAuthContext";
import Customer from "../models/Customer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function ViewProfilePage() {
  const { state } = useAuthContext();
  const { user } = state;
  let email: string = user ? user.email : "";
  console.log("User in view edit profile page: " + user?.email + user?.token);

  const apiJson = useApiJson();

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

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
    <div className="flex h-screen flex-col items-center p-6">
      <Card className="mt-6 w-full">
        <CardHeader>
          <CardTitle className="px-2">My Profile</CardTitle>
          {/* <CardDescription>
              Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="px-0">
          <div className="p-2">
            {currCustomer.customerId !== -1 && (
              <ViewProfileForm currCustomer={currCustomer} />
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <div className="invisible"> padding</div>
    </div>
  );
}

export default ViewProfilePage;

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
