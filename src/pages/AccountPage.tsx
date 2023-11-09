
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import DeleteButton from "../components/AccountPage/DeleteButton";
import LoggedInCardContent from "../components/AccountPage/LoggedInCardContent";
import LogoutButton from "../components/AccountPage/LogoutButton";
import NonLoggedInCardContent from "../components/AccountPage/NonLoggedInCardContent";
import { useAuthContext } from "../hooks/useAuthContext";

function AccountPage() {
  const { state } = useAuthContext();
  const { user } = state;
  let email: string = user ? user.email : "";
  // const customerId = user ? user.customerId : -1;
  console.log("User in account page: " + user?.email + user?.token);

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
          {/* can force a reload upon successful log in using
          window.location.reload(); */}
          {!user ? <NonLoggedInCardContent /> : <LoggedInCardContent />}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      {user ? <LogoutButton /> : <div />}
      {user ? <DeleteButton email={email} /> : <div />}

      {/* <Card className="mt-6 w-full">
        <CardHeader>
          <CardTitle>
            testing only, should be either or in above! the user context thingy
          </CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
      {/* </CardHeader>
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
      {/* </CardHeader>
        <CardContent>Favourites stuff and whatever else</CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card> */}

      <div className="invisible"> padding</div>
    </div>
  );
}

export default AccountPage;
