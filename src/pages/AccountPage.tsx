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

function AccountPage() {
  return (
    <div>
      AccountPage
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          login form here maybe, or a navlink to lead to a logni page is fine
          too, up to you. that might be cleaner
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}

export default AccountPage;
