import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import AnnouncementList from "../../components/HomePage/Announcement/AnnouncementList";

function ViewAllAnnouncementPage() {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-5">
        <AnnouncementList />
      </div>
    </div>
  );
}

export default ViewAllAnnouncementPage;
