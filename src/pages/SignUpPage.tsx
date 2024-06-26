import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SignupForm from "../components/AccountPage/SignupForm";

function SignupPage() {
  // const {user} = useAuthContext();
  //   const user = null;
  return (
    <div className="flex h-screen flex-col items-center p-2">
      <Card className="mt-6 w-full">
        <CardHeader>
          <CardTitle className="px-3">Sign up</CardTitle>
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
