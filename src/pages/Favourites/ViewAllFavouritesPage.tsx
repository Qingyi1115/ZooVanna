import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import FavouriteSpeciesList from "../../components/HomePage/Species/FavouriteSpeciesList";

function ViewAllFavouritesPage() {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-5">
        <FavouriteSpeciesList />
      </div>
    </div>
  );
}

export default ViewAllFavouritesPage;
