import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { NavLink, useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Promotion from "../../models/Promotion";

import ViewPromotionDetails from "../../components/HomePage/Promotion/ViewPromotionDetails";

function ViewPromotionDetailsPage() {
  const apiJson = useApiJson();

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

  const { promotionId } = useParams<{ promotionId: string }>();
  const [curPromotion, setCurPromotion] = useState<Promotion>(emptyPromotion);
  const [refreshSeed, setRefreshSeed] = useState<number>(0);

  const localhost_address = import.meta.env.VITE_LOCALHOST_3000_ADDRESS;

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://${localhost_address}/api/promotion/getPromotion/${promotionId}`,
        );
        setCurPromotion(responseJson as Promotion);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchPromotion();
  }, [refreshSeed]);

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="relative lg:w-1/2">
        <img
          src={`http://${localhost_address}/` + curPromotion.imageUrl}
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
        <ViewPromotionDetails curPromotion={curPromotion} />
      </div>
    </div>
  );
}

export default ViewPromotionDetailsPage;
