import HorizontalCardContainer from "../../HorizontalCardContainer";
import ImageCard from "../../ImageCard";
import { useEffect, useState } from "react";
// import { Toast } from "primereact/toast";
import useApiJson from "../../../hooks/useApiJson";
import Promotion from "../../../models/Promotion";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import PublicEvent from "../../../models/PublicEvent";
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

  let emptyPublicEvent: PublicEvent = {
    publicEventId: -1,
    title: "",
    details: "",
    startDate: new Date(Date.now()),
    endDate: null,
    // External Event
    imageUrl: "",
  };

  const [publicEventList, setPublicEventList] = useState<PublicEvent[]>([]);
  const [selectedPublicEvent, setSelectedPublicEvent] =
    useState<PublicEvent>(emptyPublicEvent);
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
          `http://${localhost_address}/api/zooEventCustomer/getAllPublicEvents`,
        );
        setPublicEventList(responseJson.result as PublicEvent[]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchPublicEvent();
  }, []);

  return (
    <div className="mb-10 h-full">
      <div className=" mb-5 flex items-center px-10 pt-10">
        <h1 className="text-2xl font-extrabold">Events</h1>
      </div>
      {publicEventList && (
        <div className="flex h-full w-full justify-center">
          <div className="grid h-fit w-full justify-center gap-6 px-10 sm:grid-cols-2 md:grid-cols-3 md:justify-between md:gap-10 md:px-10 xl:grid-cols-5">
            {publicEventList.map((item) => (
              <div className="mb-5 h-fit w-full pb-0">
                <Link
                  to={`/event/viewevent/${item.publicEventId}`}
                  className=""
                >
                  <EventImageCard
                    key={item.publicEventId}
                    imageUrl={`http://${localhost_address}/` + item.imageUrl}
                    title={item.title}
                    description={item.details}
                    startDateTime={item.startDate}
                    endDateTime={item.endDate}
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
