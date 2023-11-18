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
  const sendEmail = () => {
    const emailAddresses = "zoovanna@gmail.com, xqy1115@gmail.com";
    const subject = "Inquiry about ZooVanna";
    const body = "Hello, I'm writing to ask about ";

    const mailtoLink = `mailto:${encodeURIComponent(
      emailAddresses,
    )}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, "_blank");
  };
  return (
    <Card className="w-full">
      <CardTitle className="">
        <div className="flex w-full items-center justify-between px-8 py-3">
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
                <p className="pt-0.9 text-xs">Tickets</p>
              </button>
            </NavLink>
          </div>
          <div className="text-center">
            <NavLink to="/announcement/viewAllAnnouncements">
              <button className="flex flex-col items-center justify-center focus:outline-none">
                <FaBell className="h-5 hover:text-yellow-600" />
                <p className=" pt-1 text-xs">Notice</p>
              </button>
            </NavLink>
          </div>
          <div className="text-center">
            <button
              className="flex flex-col items-center justify-center focus:outline-none"
              onClick={sendEmail}
            >
              <MdEmail className="hover:text-yellow-600" />
              <p className="pt-0.9 text-xs">Email Us</p>
            </button>
          </div>
        </div>
      </CardTitle>
    </Card>
  );
}

export default HomeCard;
