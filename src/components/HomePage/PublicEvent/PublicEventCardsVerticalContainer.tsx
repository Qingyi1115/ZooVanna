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

  //
  //   const exportCSV = () => {
  //     dt.current?.exportCSV();
  //   };

  //   const imageBodyTemplate = (rowData: Promotion) => {
  //     return (
  //       <img
  //         src={"http://${localhost_address}/" + rowData.imageUrl}
  //         alt={rowData.title}
  //         className="aspect-square w-16 rounded-full border border-white object-cover shadow-4"
  //       />
  //     );
  //   };

  //   const navigateEditProduct = (promotion: Promotion) => {};

  //   const confirmDeletePromotion = (promotion: Promotion) => {
  //     setSelectedPromotion(promotion);
  //     setDeletePromotionDialog(true);
  //   };

  //   const hideDeletePromotionDialog = () => {
  //     setDeletePromotionDialog(false);
  //   };

  //   function convertUtcToTimezone(utcDate: Date, targetTimezone: string): string {
  //     const utcMoment = moment.utc(utcDate);
  //     const targetMoment = utcMoment.tz(targetTimezone);
  //     const formattedTime: string = targetMoment.format("MM-DD-YYYY");
  //     return formattedTime;
  //   }

  //   // delete promotion stuff
  //   const deletePromotion = async () => {
  //     let _promotion = promotionList.filter(
  //       (val) => val.promotionId !== selectedPromotion?.promotionId
  //     );

  //   const selectedPromotionTitle = selectedPromotion.title;

  //     const deletePromotionApi = async () => {
  //       try {
  //         const responseJson = await apiJson.del(
  //           "http://${localhost_address}/api/promotion/deletePromotion/" +
  //             selectedPromotion.promotionId
  //         );

  //         toastShadcn({
  //           // variant: "destructive",
  //           title: "Deletion Successful",
  //           description:
  //             "Successfully deleted promotion: " + selectedPromotionTitle,
  //         });
  //         setPromotionList(_promotion);
  //         setDeletePromotionDialog(false);
  //         setSelectedPromotion(emptyPublicEvent);
  //       } catch (error: any) {
  //         // got error
  //         toastShadcn({
  //           variant: "destructive",
  //           title: "Uh oh! Something went wrong.",
  //           description:
  //             "An error has occurred while deleting promotion: \n" +
  //             apiJson.error,
  //         });
  //       }
  //     };
  //     deletePromotionApi();
  //   };

  //   const deletePromotionDialogFooter = (
  //     <React.Fragment>
  //       <Button onClick={hideDeletePromotionDialog}>
  //         <HiX className="mr-2" />
  //         No
  //       </Button>
  //       <Button variant={"destructive"} onClick={deletePromotion}>
  //         <HiCheck className="mr-2" />
  //         Yes
  //       </Button>
  //     </React.Fragment>
  //   );
  // end delete promotion stuff

  //   const actionBodyTemplate = (promotion: Promotion) => {
  //     return (
  //       <React.Fragment>
  //         <div className="mx-auto">
  //           <NavLink to={`/promotion/viewpromotion/${promotion.promotionId}`}>
  //             <Button className="mr-2">
  //               <HiEye className="mr-auto" />
  //             </Button>
  //           </NavLink>
  //           <Button
  //             variant={"destructive"}
  //             className="mr-2"
  //             onClick={() => confirmDeletePromotion(promotion)}
  //           >
  //             <HiTrash className="mx-auto" />
  //           </Button>
  //         </div>
  //       </React.Fragment>
  //     );
  //   };

  //   const header = (
  //     <div className="flex flex-wrap items-center justify-between gap-2">
  //       <h4 className="m-1">Manage Promotion</h4>
  //       <span className="p-input-icon-left">
  //         <i className="pi pi-search" />
  //         <InputText
  //           type="search"
  //           placeholder="Search..."
  //           onInput={(e) => {
  //             const target = e.target as HTMLInputElement;
  //             setGlobalFilter(target.value);
  //           }}
  //         />
  //       </span>
  //     </div>
  //   );

  return (
    <div>
      <div className=" flex items-center px-10 pt-10">
        <h1 className="text-2xl font-extrabold">Events</h1>
      </div>
      {publicEventList && (
        <div className="flex justify-center  pb-5">
          <div className="md:flex md:px-10">
            {publicEventList.map((item) => (
              <div className="w-full pt-5 md:grid md:grid-cols-6 md:gap-5">
                <Link
                  to={`/event/viewevent/${item.zooEventId}`}
                  className="w-full"
                >
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
