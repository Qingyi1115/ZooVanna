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
import EventImageCard from "../../../components/EventImageCard";

function PublicEventCardsContainer() {
  const apiJson = useApiJson();

  // date options

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
      <div className="flex items-center justify-between px-4 pt-4 md:justify-start">
        <h1 className="text-xl font-extrabold">Events</h1>
        <a className="ml-5 pt-1 text-sm font-bold" href="/event/viewAllEvents">
          View All {" >"}
        </a>
      </div>
      {publicEventList && (
        <div className="flex items-center">
          <HorizontalCardContainer>
            {publicEventList.map((item) => (
              <Link to={`/event/viewevent/${item.publicEventId}`}>
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
            ))}
          </HorizontalCardContainer>
        </div>
      )}
    </div>
  );
}

export default PublicEventCardsContainer;
