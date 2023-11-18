import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Announcement from "../../models/Announcement";

import ViewAnnouncementDetails from "../../components/HomePage/Announcement/ViewAnnouncementDetails";

function ViewAnnouncementDetailsPage() {
  const apiJson = useApiJson();
  let emptyAnnouncement: Announcement = {
    announcementId: -1,
    title: "",
    content: "",
    isPublished: false,
    scheduledStartPublish: new Date(),
    scheduledEndPublish: new Date(),
  };

  const { announcementId } = useParams<{ announcementId: string }>();
  const [curAnnouncement, setCurAnnouncement] =
    useState<Announcement>(emptyAnnouncement);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/announcement/getAnnouncement/${announcementId}`,
        );
        console.log(responseJson);
        setCurAnnouncement(responseJson as Announcement);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchAnnouncement();
  }, [refreshSeed]);

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="flex px-4 pl-5 pt-10">
        <NavLink to={`/announcement/viewAllAnnouncements`} className="">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
            <FaChevronLeft />
          </button>
        </NavLink>
        <h1 className="ml-4 pt-1 text-xl font-extrabold">
          Announcement Details
        </h1>
      </div>

      <div className="flex flex-col p-6 lg:w-1/2">
        <ViewAnnouncementDetails curAnnouncement={curAnnouncement} />
      </div>
    </div>
  );
}

export default ViewAnnouncementDetailsPage;
