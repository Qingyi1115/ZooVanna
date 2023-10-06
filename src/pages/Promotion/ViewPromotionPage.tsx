import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useApiJson from "../../hooks/useApiJson";
import Promotion from "../../models/Promotion";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";

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

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const responseJson = await apiJson.get(
          `http://localhost:3000/api/promotion/getPromotion/${promotionId}`,
        );
        setCurPromotion(responseJson as Promotion);
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchPromotion();
  }, [refreshSeed]);

  return (
    <div className="flex h-screen flex-col">
      {/* <div className="flex w-full flex-col gap-6 rounded-lg border border-stroke bg-white p-20 text-black shadow-lg">
        {curPromotion && curPromotion.promotionId != -1 && (
          <div className="relative flex flex-col">
            <div className="mb-4 flex justify-between">
              <NavLink className="flex" to={`/`}>
                <Button variant={"outline"} type="button" className="">
                  Back
                </Button>
              </NavLink>
              <span className="self-center text-lg text-graydark">
                Promotion Details
              </span>
              <Button disabled className="invisible">
                Back
              </Button>
            </div>
            <Separator />
            <span className="mt-4 self-center text-title-xl font-bold">
              {curPromotion.title}
            </span> */}
      {/* <img
        src={"http://localhost:3000/" + curPromotion.imageUrl}
        alt="Current promotion image"
        className="self-centerobject-cover w-full shadow-4"
      />
      <NavLink className="flex" to={`/`}>
        <Button variant={"outline"} type="button" className="">
          Back
        </Button>
      </NavLink> */}

      <div className="relative">
        <img
          src={"http://localhost:3000/" + curPromotion.imageUrl}
          alt="Current promotion image"
          className="w-full object-cover shadow-4"
        />
        <NavLink to={`/`} className="absolute left-4 top-4">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white bg-opacity-75 text-black">
            <FaChevronLeft /> {/* Use the imported icon component */}
          </button>
        </NavLink>
      </div>

      <div className="flex h-screen flex-col p-6">
        <ViewPromotionDetails curPromotion={curPromotion} />
      </div>
      {/* </div> */}
      {/* )} */}
      {/* </div> */}
    </div>
  );
}

export default ViewPromotionDetailsPage;
