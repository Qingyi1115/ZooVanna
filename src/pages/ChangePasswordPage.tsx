import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import ChangePasswordForm from "../components/AccountPage/ChangePasswordForm";
import useApiJson from "../hooks/useApiJson";
import { useAuthContext } from "../hooks/useAuthContext";
import Customer from "../models/Customer";

function ChangePasswordPage() {
  const { state } = useAuthContext();
  const { user } = state;
  let email: string = user ? user.email : "";
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  //   console.log("User in view edit profile page: " + user?.email + user?.token);

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
    <div className="p-2">
      {currCustomer.customerId !== -1 && (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="px-7">Change Password</CardTitle>
            {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
          </CardHeader>
          <CardContent>
            {/* can force a reload upon successful log in using
          window.location.reload(); */}
            <ChangePasswordForm currCustomer={currCustomer} />
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      )}
    </div>
  );
}

export default ChangePasswordPage;
