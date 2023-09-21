import { Button } from "@/components/ui/button";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Separator } from "@/components/ui/separator";

import { HiOutlineChevronRight } from "react-icons/hi";

function NonLoggedInCardContent() {
  return (
    <div className="flex flex-col">
      <NavLink to="/account">
        <Button
          variant={"ghost"}
          className="mx-0 w-full justify-between rounded-none text-base"
        >
          Login
          <HiOutlineChevronRight />
        </Button>
        <Separator className="opacity-20" />
      </NavLink>
      <NavLink to="/LoginForm">
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

export default NonLoggedInCardContent;
