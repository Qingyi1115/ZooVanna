import { Button } from "@/components/ui/button";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

import { HiOutlineChevronRight } from "react-icons/hi";

function NonLoggedInCardContent() {
  return (
    <div className="flex flex-col">
      <NavLink to="/login">
        <Button
          variant={"ghost"}
          className="mx-0 w-full justify-between rounded-none text-base"
        >
          Login
          <HiOutlineChevronRight />
        </Button>
        <Separator className="opacity-20" />
      </NavLink>
      <NavLink to="/signupemail">
        <Button
          variant={"ghost"}
          className="w-full justify-between rounded-none  text-base"
        >
          Sign up
          <HiOutlineChevronRight />
        </Button>
        <Separator className="opacity-20" />
      </NavLink>
      <NavLink to="/requestResetPassword">
        <Button
          variant={"ghost"}
          className="w-full justify-between rounded-none  text-base"
        >
          Forgot password
          <HiOutlineChevronRight />
        </Button>
        <Separator className="opacity-20" />
      </NavLink>
    </div>
  );
}

export default NonLoggedInCardContent;
