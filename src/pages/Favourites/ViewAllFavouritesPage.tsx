import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import FavouriteSpeciesList from "../../components/HomePage/Species/FavouriteSpeciesList";

function ViewAllFavouritesPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-5">
        <FavouriteSpeciesList />
        <div className="px-4">
          <Button
            className="mt-5 w-full"
            onClick={() => navigate("/notFavourites")}
          >
            Add Favourites
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ViewAllFavouritesPage;
