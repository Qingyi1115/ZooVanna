import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useAuthContext } from "../../hooks/useAuthContext";
//import LoggedInCardContent from "../../components/AccountPage/LoggedInCardContent";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import LoginPurchaseForm from "../AccountPage/LoginPurchaseForm";

function CustOrGuest() {
  const { state } = useAuthContext();
  const { user } = state;
  let email: string = user ? user.email : "";
  // const customerId = user ? user.customerId : -1;
  console.log("User in account page: " + user?.email + user?.token);
  return (
    <div className="block items-center justify-center lg:flex">
      <div className="items-center justify-center">
        <Card className="sm:w-130 w-80 w-full items-center justify-center md:w-150">
          <CardHeader className="items-center justify-center">
            <CardTitle>Continue As Guest</CardTitle>
          </CardHeader>
          <CardContent className="p-auto items-center justify-center">
            <div className="mb-5">
              You can buy ticket without creating an account!
            </div>
            <NavLink to="/tickets/selectListing">
              <Button className="w-full">Continue as guest</Button>
            </NavLink>
          </CardContent>
        </Card>
      </div>
      <div className="ml-1 mt-20 items-center justify-center sm:mt-30 lg:ml-30 lg:mt-0">
        {/* can force a reload upon successful log in using
          window.location.reload(); */}
        <Card className=" md:h-140 sm:w-130 w-80 w-full justify-center ">
          <CardHeader className="items-center justify-center">
            <CardTitle>Have an account? Log in</CardTitle>
            {/* <CardDescription>
                Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="h-auto w-auto items-center justify-center px-0">
            <LoginPurchaseForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CustOrGuest;
