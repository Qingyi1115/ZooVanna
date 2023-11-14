import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import LoginForm from "../components/AccountPage/LoginForm";

function LoginPage() {
  // const {user} = useAuthContext();
  //   const user = null;
  return (
    <div className="flex h-screen flex-col items-center p-6">
      <Card className="mt-6 w-full">
        <CardHeader>
          <CardTitle className="px-2">Log in</CardTitle>
          {/* <CardDescription>
                Deploy your new project in one-click.
            </CardDescription> */}
        </CardHeader>
        <CardContent className="px-0">
          <LoginForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
      <div className="invisible"> padding</div>
    </div>
  );
}

export default LoginPage;
