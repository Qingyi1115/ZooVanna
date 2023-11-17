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
import Announcement from "../../../models/Announcement";

import { useToast } from "@/components/ui/use-toast";

import { Link, NavLink } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

function AnnouncementList() {
  const apiJson = useApiJson();

  let emptyAnnouncement: Announcement = {
    announcementId: -1,
    title: "",
    content: "",
    isPublished: false,
    scheduledStartPublish: new Date(),
    scheduledEndPublish: new Date(),
  };

  const [announcementList, setAnnouncementList] = useState<Announcement[]>([]);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement>(emptyAnnouncement);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/announcement/getAllPublishedAnnouncements`,
        );
        setAnnouncementList(responseJson as Announcement[]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchAnnouncement();
  }, []);

  return (
    <div>
      <div className="flex px-4 pt-4">
        <NavLink to={`/`} className="">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
            <FaChevronLeft />
          </button>
        </NavLink>
        <h1 className="ml-4 pt-1 text-xl font-extrabold">Announcements</h1>
      </div>
      {announcementList && (
        <div>
          {announcementList.map((announcement) => (
            <div className="py-2">
              <Link
                to={`/announcement/viewannouncement/${announcement.announcementId}`}
              >
                <Card>
                  <CardHeader className="text-md pb-3 font-bold">
                    {announcement.title}
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div className="line-clamp-2 overflow-hidden ">
                      {announcement.content}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnnouncementList;
