import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { MdEmail } from "react-icons/md";
import { FaLightbulb, FaBell } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
// import { HiLightBulb } from "react-icons/hi2";

//MdEmail from md
//HiLightBulb from hi
//HiLightBulb from hi2

function HomeCard() {
  return (
    <Card className="w-full">
      <CardTitle className="">
        <div className="flex w-full items-center justify-between px-10 py-3">
          <div className="text-center">
            <NavLink to="/species/viewAllSpecies">
              <button className="flex flex-col items-center justify-center focus:outline-none">
                <FaLightbulb className="h-5 hover:text-yellow-600" />
                <p className=" pt-1 text-xs">Discover</p>
              </button>
            </NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/tickets">
              <button className="flex flex-col items-center justify-center focus:outline-none">
                <HiTicket className="hover:text-yellow-600" />
                <p className="pt-0.9 text-xs">Buy Tickets</p>
              </button>
            </NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/announcement/viewAllAnnouncements">
              <button className="flex flex-col items-center justify-center focus:outline-none">
                <FaBell className="h-5 hover:text-yellow-600" />
                <p className=" pt-1 text-xs">Announcement</p>
              </button>
            </NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/emailUs">
              <button className="flex flex-col items-center justify-center focus:outline-none">
                <MdEmail className="hover:text-yellow-600" />
                <p className="pt-0.9 text-xs">Email Us</p>
              </button>
            </NavLink>
          </div>
        </div>
      </CardTitle>
    </Card>
  );
}

export default HomeCard;
