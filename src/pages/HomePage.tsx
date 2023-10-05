import { Button } from "@/components/ui/button";
import React from "react";
import PromotionCardsContainer from "../components/HomePage/Promotion/PromotionCardsContainer";

function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center p-6">
      {/* <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="link">Link</Button> */}

      <PromotionCardsContainer />
    </div>
  );
}

export default HomePage;
