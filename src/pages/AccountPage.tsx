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

function AccountPage() {
  // const {user} = useAuthContext();
  const user = null;
  return (
    <div className="flex h-screen flex-col items-center p-6">
      {/* AccountPage */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent>
          can force a reload upon successful log in using
          window.location.reload();
          {!user ? <LoginForm /> : <LoggedInCardContent />}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <Card className="mt-6 w-full">
        <CardHeader>
          <CardTitle>
            testing only, should be either or in above! the user context thingy
          </CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="px-0">
          <LoggedInCardContent />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <Card className="mt-6 w-full">
        <CardHeader>
          <CardTitle>More</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent>Favourites stuff and whatever else</CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <Button
        variant={"outline"}
        className="border-danger hover:bg-danger/50 text-danger mb-6 mt-4 w-1/2 rounded-xl shadow-md"
      >
        Log out
      </Button>
      <div className="invisible"> padding</div>
    </div>
  );
}

export default AccountPage;
