import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import ReportFaultyFacilityForm from "../../components/Map/ReportFaultyFacilityForm";
import Facility from "../../models/Facility";
import { NavLink, useParams } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

function ReportFaultyFacilityPage() {
  const { facilityId } = useParams<{ facilityId: string }>();

  return (
    <div className="p-2">
      <Card className="w-full">
        <CardHeader>
          <div className="flex px-4 pl-5 pt-10">
            <NavLink to={`/facility/viewfacility/${facilityId}`} className="">
              <button className="flex h-8 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
                <FaChevronLeft />
              </button>
            </NavLink>
            <CardTitle className="px-5 text-xl">
              Report Faulty Facility
            </CardTitle>
          </div>
          {/* <CardDescription>
              Deploy your new project in one-click.
            </CardDescription> */}
        </CardHeader>
        <CardContent>
          {/* can force a reload upon successful log in using
            window.location.reload(); */}
          <ReportFaultyFacilityForm facilityId={facilityId} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
}

export default ReportFaultyFacilityPage;
