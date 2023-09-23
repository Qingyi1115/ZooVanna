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
import RequestResetPasswordForm from "../components/AccountPage/RequestResetPasswordForm";
import ResetPasswordForm from "../components/AccountPage/ResetPasswordForm";

function ResetPasswordPage() {
  //   console.log("User in view edit profile page: " + user?.email + user?.token);

  //   const customer = await apiJson.get(
  //     "http://localhost:3000/api/customer/getCustomer",
  //     email,
  //   );

  return (
    <div className="p-10">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          {/* can force a reload upon successful log in using
          window.location.reload(); */}
          <ResetPasswordForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}

export default ResetPasswordPage;