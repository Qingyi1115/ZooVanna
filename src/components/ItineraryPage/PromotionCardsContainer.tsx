import HorizontalCardContainer from "../HorizontalCardContainer";
import ImageCard from "../ImageCard";

import { useEffect, useState } from "react";

// import { Toast } from "primereact/toast";

import useApiJson from "../../hooks/useApiJson";
import Itinerary from "../../models/Itinerary";

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

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  //   const dt = useRef<DataTable<Promotion[]>>(null);

  const toastShadcn = useToast().toast;

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/promotion/getAllPublishedPromotions`,
        );
        setPromotionList(responseJson as Promotion[]);
      } catch (error: any) {
        console.log(error);
      }
    };
    fetchPromotion();
  }, []);

  return (
    <div>
      <div className="px-4 pt-4">
        <h1 className="text-xl font-extrabold">Promotions</h1>
      </div>
      {promotionList && (
        <HorizontalCardContainer>
          {promotionList.map((item) => (
            <Link to={`/promotion/viewpromotion/${item.promotionId}`}>
              <ImageCard
                key={item.promotionId}
                imageUrl={`http://${localhost_address}/` + item.imageUrl}
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
