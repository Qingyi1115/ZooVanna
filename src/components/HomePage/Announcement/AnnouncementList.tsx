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

import { Link } from "react-router-dom";

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
      <div className="px-4 pt-4">
        <h1 className="text-xl font-extrabold">Announcements</h1>
      </div>
      {announcementList && (
        <div>
          {announcementList.map((announcement) => (
            <div className="py-2">
              <Link
                to={`/announcement/viewannouncement/${announcement.announcementId}`}
              >
                <Card>
                  <CardHeader className="text-md font-bold pb-3">
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
