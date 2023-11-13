import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Promotion from "../../models/Promotion";

import ViewPromotionDetails from "../../components/HomePage/Promotion/ViewPromotionDetails";
import ZooEvent from "../../models/ZooEvent";
import { EventType } from "../../enums/EventType";
import ViewPublicEventDetails from "../../components/HomePage/PublicEvent/ViewPublicEventDetails";

function ViewPublicEventDetailsPage() {
  const apiJson = useApiJson();

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

  const { zooEventId } = useParams<{ zooEventId: string }>();
  const [curPublicEvent, setCurPublicEvent] =
    useState<ZooEvent>(emptyPublicEvent);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchPublicEvent = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/zooEventCustomer/getPublishedPublicZooEvent/${zooEventId}`,
        );
        console.log(responseJson);
        setCurPublicEvent(responseJson.result as ZooEvent);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchPublicEvent();
  }, [refreshSeed]);

  return (
    <div className="flex h-[93vh] flex-col lg:flex-row">
      <div className="relative lg:flex lg:h-[90vh] lg:w-1/2 lg:items-center">
        <img
          src={`http://${localhost_address}/` + curPublicEvent.imageUrl}
          alt="Current promotion image"
          className={`mx-auto w-full max-w-full object-cover lg:mx-0 ${
            window.innerWidth >= 1024
              ? "pl-20 pt-4 lg:rounded-bl-xl lg:rounded-tl-xl"
              : ""
          }`}
        />
        <NavLink to={`/`} className="absolute left-4 top-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
            <FaChevronLeft />
          </button>
        </NavLink>
      </div>

      <div className="flex flex-col p-6 lg:w-1/2">
        <ViewPublicEventDetails curPublicEvent={curPublicEvent} />
      </div>
    </div>
  );
}

export default ViewPublicEventDetailsPage;
