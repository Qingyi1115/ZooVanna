import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useApiJson from "../hooks/useApiJson";
import Customer from "../models/Customer";
import { Country } from "../enums/Country";
import EditProfileForm from "../components/AccountPage/EditProfileForm";
import { useAuthContext } from "../hooks/useAuthContext";
import ViewProfileForm from "../components/AccountPage/ViewProfileForm";
import ChangePasswordForm from "../components/AccountPage/ChangePasswordForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ChangePasswordPage() {
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
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
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
