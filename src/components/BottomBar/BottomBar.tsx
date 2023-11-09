import { useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
// import Logo from "../images/logo/logo.svg";

import {
  HiOutlineDocumentText,
  HiOutlineHome,
  HiOutlineMap,
  HiOutlineTicket,
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
      className={`fixed inset-x-0 bottom-0 left-0 z-9999 mb-0 inline-block flex h-[7vh] h-auto w-screen flex-row overflow-y-hidden bg-black duration-300 ease-linear lg:static`}
    >
      <div className="no-scrollbar flex h-full w-full flex-row items-center justify-around duration-300 ease-linear">
        <NavLink
          to="/"
          className={`flex h-14 w-14 items-center justify-center rounded-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineHome className="h-full w-5" />
            <span className="text-sm">Home</span>
          </div>
        </NavLink>
        <NavLink
          to="/map"
          className={`flex h-14 w-14 items-center justify-center rounded-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineMap className="h-full w-5" />
            <span className="text-sm">Map</span>
          </div>
        </NavLink>
        <NavLink
          to="/tickets"
          className={`flex h-14 w-14 items-center justify-center rounded-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineTicket className="h-full w-5" />
            <span className="text-sm">Tickets</span>
          </div>
        </NavLink>
        <NavLink
          to="/itinerary"
          className={`flex h-14 w-14 items-center justify-center rounded-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineDocumentText className="h-full w-5" />
            <span className="text-sm">Itinerary</span>
          </div>
        </NavLink>
        <NavLink
          to="/account"
          className={`flex h-14 w-14 items-center justify-center rounded-sm font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark ${
            pathname.includes("calendar") && "bg-graydark "
          }`}
        >
          <div className="flex flex-col items-center justify-center">
            <HiOutlineUser className="h-full w-5" />
            <span className="text-sm">Account</span>
          </div>
        </NavLink>
      </div>
    </footer>
  );
};

export default BottomBar;
