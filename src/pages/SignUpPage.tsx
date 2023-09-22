import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginForm from "../components/AccountPage/LoginForm";
import LoggedInCardContent from "../components/AccountPage/LoggedInCardContent";
import { Button } from "@/components/ui/button";
import SignupForm from "../components/AccountPage/SignupForm";

function SignupPage() {
  // const {user} = useAuthContext();
  //   const user = null;
  return (
    <div className="flex h-screen flex-col items-center p-6">
      <Card className="mt-6 w-full">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          {/* <CardDescription>
                Deploy your new project in one-click.
            </CardDescription> */}
        </CardHeader>
        <CardContent className="px-0">
          <SignupForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <div className="invisible"> padding</div>
    </div>
  );
}

export default SignupPage;
