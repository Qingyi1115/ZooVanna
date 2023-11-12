import { Navigate, useLocation } from "react-router-dom";
import Listing from "../../models/Listing";

function ListingPage() {
  const location = useLocation();
  let localListingList: Listing[] = location.state.localListingList;
  const foreignerListingList: Listing[] = location.state.foreignerListingList;
  const entryDate = location.state.entryDate;
  const personal = location.state.personal;

  console.log("here " + localListingList);

  return (
    <>
      <div className="flex items-center justify-center pb-5 pt-0">
        <Navigate
          to="/listingForm"
          state={{
            localListingList,
            foreignerListingList,
            entryDate,
            personal,
          }}
        />
      </div>
    </>
  );
}

export default ListingPage;
