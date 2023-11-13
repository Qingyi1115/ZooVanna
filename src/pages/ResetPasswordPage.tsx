import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPasswordForm from "../components/AccountPage/ResetPasswordForm";

function ResetPasswordPage() {
  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;
  //   console.log("User in view edit profile page: " + user?.email + user?.token);

  //   const customer = await apiJson.get(
  //     "http://${localhost_address}/api/customer/getCustomer",
  //     email,
  //   );

  return (
    <div className="flex h-full w-full items-center p-10">
      <Card className="w-full justify-center">
        <CardHeader className="flex w-4/5 justify-center ">
          <CardTitle className="">Reset Password</CardTitle>
          {/* <CardDescription>
            Deploy your new project in one-click.
          </CardDescription> */}
        </CardHeader>
        <CardContent className="flex h-full w-full justify-center pb-0">
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
