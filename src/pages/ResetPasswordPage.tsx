import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
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
