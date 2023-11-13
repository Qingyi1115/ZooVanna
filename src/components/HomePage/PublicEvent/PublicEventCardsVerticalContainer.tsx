import HorizontalCardContainer from "../../HorizontalCardContainer";
import ImageCard from "../../ImageCard";
import { useEffect, useState } from "react";
// import { Toast } from "primereact/toast";
import useApiJson from "../../../hooks/useApiJson";
import Promotion from "../../../models/Promotion";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import ZooEvent from "../../../models/ZooEvent";
import { EventType } from "../../../enums/EventType";
import { Button } from "@/components/ui/button";
import EventImageCard from "../../EventImageCard";

function PublicEventCardsVerticalContainer() {
  const apiJson = useApiJson();

  // date options
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  let emptyPublicEvent: ZooEvent = {
    zooEventId: -1,
    eventName: "",
    eventDescription: "",
    eventIsPublic: false,
    eventType: EventType.CUSTOMER_FEEDING,
    eventStartDateTime: new Date(Date.now()),
    requiredNumberOfKeeper: -1,
    // External Event
    eventNotificationDate: new Date(Date.now()),
    eventEndDateTime: new Date(Date.now()),
    imageUrl: "",
    eventDurationHrs: 0,
    eventTiming: null,
  };

  const [publicEventList, setPublicEventList] = useState<ZooEvent[]>([]);
  const [selectedPublicEvent, setSelectedPublicEvent] =
    useState<ZooEvent>(emptyPublicEvent);
  //   const [deletePromotionDialog, setDeletePromotionDialog] =
  //     useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  //   const dt = useRef<DataTable<Promotion[]>>(null);

  const toastShadcn = useToast().toast;

  useEffect(() => {
    const fetchPublicEvent = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/zooEventCustomer/getAllPublishedPublicZooEvents`,
        );
        setPublicEventList(responseJson.result as ZooEvent[]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchPublicEvent();
  }, []);

  return (
    <div className="h-screen md:h-[88vh]">
      <div className=" flex items-center px-10 pt-10">
        <h1 className="text-2xl font-extrabold">Events</h1>
      </div>
      {publicEventList && (
        <div className="flex h-screen w-full justify-center ">
          <div className="grid h-fit w-full justify-center gap-6 px-10 sm:grid-cols-2 md:grid-cols-3 md:justify-between md:gap-10 md:px-10 xl:grid-cols-5">
            {publicEventList.map((item) => (
              <div className="w-full pb-0 pt-5">
                <Link to={`/event/viewevent/${item.zooEventId}`} className="">
                  <EventImageCard
                    key={item.zooEventId}
                    imageUrl={`http://${localhost_address}/` + item.imageUrl}
                    title={item.eventName}
                    description={item.eventDescription}
                    startDateTime={item.eventStartDateTime}
                    facilityName={
                      item.inHouse?.facility?.facilityName
                        ? item.inHouse.facility.facilityName
                        : ""
                    }
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default PublicEventCardsVerticalContainer;
