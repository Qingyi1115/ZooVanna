import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import Logo from "../images/logo/logo.svg";
import BottomBarLinkGroup from "./BottomBarLinkGroup";

import {
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineTicket,
  HiOutlineDocumentText,
  HiOutlineUser,
} from "react-icons/hi";

// interface BottomBarProps {
//   sidebarOpen: boolean;
//   setSidebarOpen: (arg: boolean) => void;
// }

const BottomBar = () => {
  const location = useLocation();
  const { pathname } = location;

  // const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  return (
    <footer
      ref={sidebar}
      className={`z-9999 h-18 fixed bottom-0 left-0 flex w-screen flex-row overflow-y-hidden bg-black duration-300 ease-linear lg:static `}
    >
      <div className="no-scrollbar flex h-full w-full flex-row items-center justify-around duration-300 ease-linear">
        <NavLink
          to="/"
          className={`text-bodydark1 hover:bg-graydark flex h-14 w-14 items-center justify-center rounded-sm font-medium duration-300 ease-in-out ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineHome className="h-full w-6" />
            <span className="text-sm">Home</span>
          </div>
        </NavLink>
        <NavLink
          to="/map"
          className={`text-bodydark1 hover:bg-graydark flex h-14 w-14 items-center justify-center rounded-sm font-medium duration-300 ease-in-out ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineMap className="h-full w-6" />
            <span className="text-sm">Map</span>
          </div>
        </NavLink>
        <NavLink
          to="/tickets"
          className={`text-bodydark1 hover:bg-graydark flex h-14 w-14 items-center justify-center rounded-sm font-medium duration-300 ease-in-out ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineTicket className="h-full w-6" />
            <span className="text-sm">Tickets</span>
          </div>
        </NavLink>
        <NavLink
          to="/itinerary"
          className={`text-bodydark1 hover:bg-graydark flex h-14 w-14 items-center justify-center rounded-sm font-medium duration-300 ease-in-out ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineDocumentText className="h-full w-6" />
            <span className="text-sm">Itinerary</span>
          </div>
        </NavLink>
        <NavLink
          to="/account"
          className={`text-bodydark1 hover:bg-graydark flex h-14 w-14 items-center justify-center rounded-sm font-medium duration-300 ease-in-out ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineUser className="h-full w-6" />
            <span className="text-sm">Account</span>
          </div>
        </NavLink>
      </div>
    </footer>
  );
};

export default BottomBar;
