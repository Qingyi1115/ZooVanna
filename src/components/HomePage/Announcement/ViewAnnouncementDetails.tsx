import HorizontalCardContainer from "../../HorizontalCardContainer";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect, useState } from "react";

// import { Toast } from "primereact/toast";

import useApiJson from "../../../hooks/useApiJson";

import { useToast } from "@/components/ui/use-toast";

import { Link, NavLink } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import Announcement from "../../../models/Announcement";

interface AnnouncementDetailsProps {
  curAnnouncement: Announcement;
}

function ViewAnnouncementDetails(props: AnnouncementDetailsProps) {
  const { curAnnouncement } = props;
  console.log(curAnnouncement);
  const toastShadcn = useToast().toast;

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  return (
    <div className="mx-4">
      <h2 className=" pb-4 text-lg font-bold">{curAnnouncement.title}</h2>

      <div>{curAnnouncement.content}</div>
    </div>
  );
}

export default ViewAnnouncementDetails;
