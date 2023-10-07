import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function Successful() {
  return (
    <div className="w-screen justify-center pt-70">
      <div className="mb-10 flex justify-center pl-0 text-4xl font-bold">
        Payment Successful!
      </div>
      <div className="mt-20 flex w-full justify-center">
        <NavLink to="/">
          <Button className="w-30 rounded md:w-50">Home</Button>
        </NavLink>
      </div>
    </div>
  );
}

export default Successful;
