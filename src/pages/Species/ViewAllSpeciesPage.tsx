import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import SpeciesList from "../../components/HomePage/Species/SpeciesList";

function ViewAllSpeciesPage() {
  return (
    <div className="flex h-full flex-col p-6">
      <div className="mb-5">
        <SpeciesList />
      </div>
    </div>
  );
}

export default ViewAllSpeciesPage;
