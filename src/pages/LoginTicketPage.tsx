
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

import LoginFormTicket from "../components/AccountPage/LoginFormTicket";

function LoginTicketPage() {
  // const {user} = useAuthContext();
  //   const user = null;
  return (
    <div className="flex h-screen flex-col items-center p-6">
      <Card className="mt-6 w-full">
        <CardHeader>
          <CardTitle>Log in to your existing account</CardTitle>
          {/* <CardDescription>
                Deploy your new project in one-click.
            </CardDescription> */}
        </CardHeader>
        <CardContent className="px-0">
          <LoginFormTicket />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <div className="invisible"> padding</div>
    </div>
  );
}

export default LoginTicketPage;
