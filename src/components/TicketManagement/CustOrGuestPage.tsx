import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuthContext } from "../../hooks/useAuthContext";
//import LoggedInCardContent from "../../components/AccountPage/LoggedInCardContent";
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
    <div className="block items-center overflow-hidden pt-5 lg:flex lg:pt-0">
      <div className=" flex w-screen items-center justify-center px-5 lg:px-10">
        <Card className="lg:md-50 w-full items-center justify-center md:mt-0">
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
      <div className="mt-10 flex w-screen items-center justify-center px-5 pb-5 lg:px-20">
        {/* can force a reload upon successful log in using
          window.location.reload(); */}
        <Card className="w-full items-center justify-center lg:mt-0">
          <CardHeader className="items-center justify-center">
            <CardTitle>Have an account? Log in</CardTitle>
            {/* <CardDescription>
                Deploy your new project in one-click.
            </CardDescription> */}
          </CardHeader>
          <CardContent className="h-auto w-auto items-center justify-center">
            <LoginPurchaseForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CustOrGuest;
