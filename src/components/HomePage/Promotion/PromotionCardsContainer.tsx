import ImageCard from "../../ImageCard";
import HorizontalCardContainer from "../../HorizontalCardContainer";

import { useEffect, useState } from "react";

// import { Toast } from "primereact/toast";

import Promotion from "../../../models/Promotion";
import useApiJson from "../../../hooks/useApiJson";

import { useToast } from "@/components/ui/use-toast";

import { Link } from "react-router-dom";

function PromotionCardsContainer() {
  const apiJson = useApiJson();

  // date options
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
  };

  let emptyPromotion: Promotion = {
    promotionId: -1,
    title: "",
    description: "",
    publishDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    percentage: 0,
    minimumSpending: 0,
    promotionCode: "",
    imageUrl: "",
    maxRedeemNum: 0,
    currentRedeemNum: 0,
  };

  const [promotionList, setPromotionList] = useState<Promotion[]>([]);
  const [selectedPromotion, setSelectedPromotion] =
    useState<Promotion>(emptyPromotion);
  //   const [deletePromotionDialog, setDeletePromotionDialog] =
  //     useState<boolean>(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");

  //   const dt = useRef<DataTable<Promotion[]>>(null);

  const toastShadcn = useToast().toast;

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const responseJson = await apiJson.get(
          "http://localhost:3000/api/promotion/getAllPublishedPromotions",
        );
        setPromotionList(responseJson as Promotion[]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchPromotion();
  }, []);

  //
  //   const exportCSV = () => {
  //     dt.current?.exportCSV();
  //   };

  //   const imageBodyTemplate = (rowData: Promotion) => {
  //     return (
  //       <img
  //         src={"http://localhost:3000/" + rowData.imageUrl}
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
  //           "http://localhost:3000/api/promotion/deletePromotion/" +
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
  //         setSelectedPromotion(emptyPromotion);
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
      <div className="px-4 pt-4">
        <h1 className="text-xl font-extrabold">Promotions</h1>
      </div>
      {promotionList && (
        <HorizontalCardContainer>
          {promotionList.map((item) => (
            <Link to="/account">
              <ImageCard
                id={item.promotionId}
                imageUrl={"http://localhost:3000/" + item.imageUrl}
                title={item.title}
                description={item.description}
              />
            </Link>
          ))}
        </HorizontalCardContainer>
      )}
    </div>
  );
}

export default PromotionCardsContainer;
