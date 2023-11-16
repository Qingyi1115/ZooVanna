import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import FavouriteSpeciesList from "../../components/HomePage/Species/FavouriteSpeciesList";
import NotFavouriteSpeciesList from "../../components/HomePage/Species/NotFavouriteSpeciesList";

function ViewNotFavouritesPage() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-5">
        <NotFavouriteSpeciesList />
      </div>
      <div className="px-4">
        <Button className="mt-5 w-full" onClick={() => navigate("/favourites")}>
          Go back to Favourites
        </Button>
      </div>
    </div>
  );
}

export default ViewNotFavouritesPage;
