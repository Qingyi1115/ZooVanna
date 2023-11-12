import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

import { HiOutlineChevronRight } from "react-icons/hi";

function LoggedInCardContent() {
  return (
    <div className="flex flex-col">
      {/* <img
        src="https://cloudfour.com/examples/img-currentsrc/images/kitten-large.png"
        alt="profile pic"
        className="mb-4 aspect-square w-1/4 self-center rounded-full border shadow-lg"
      /> */}
      <NavLink to="/viewProfile">
        <Button
          variant={"ghost"}
          className="mx-0 w-full justify-between rounded-none text-base"
        >
          View My Profile
          <HiOutlineChevronRight />
        </Button>
        <Separator className="opacity-20" />
      </NavLink>
      {/* <NavLink to="/editProfile">
        <Button
          variant={"ghost"}
          className="mx-0 w-full justify-between rounded-none text-base"
        >
          Edit My Profile
          <HiOutlineChevronRight />
        </Button>
        <Separator className="opacity-20" />
      </NavLink> */}
      <NavLink to="/tickets/purchasedTickets">
        <Button
          variant={"ghost"}
          className="mx-0 w-full justify-between rounded-none text-base"
        >
          View Bookings
          <HiOutlineChevronRight />
        </Button>
        <Separator className="opacity-20" />
      </NavLink>
      <NavLink to="/changePassword">
        <Button
          variant={"ghost"}
          className="w-full justify-between rounded-none  text-base"
        >
          Change Password
          <HiOutlineChevronRight />
        </Button>
        <Separator className="opacity-20" />
      </NavLink>
    </div>
  );
}

export default LoggedInCardContent;
