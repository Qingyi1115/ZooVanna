import PublicEventCardsContainer from "../components/HomePage/PublicEvent/PublicEventCardsContainer";
import Banner from "../components/HomePage/Banner/Banner";
import PromotionCardsContainer from "../components/HomePage/Promotion/PromotionCardsContainer";
import HomeCard from "../components/HomePage/HomeCard";

function HomePage() {
  return (
    <div className="flex h-screen flex-col ">
      {/* <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="link">Link</Button> */}
      <div className="">
        {/* <h1 className="px-4 text-2xl font-bold">Merlion Zoo</h1> */}
        <Banner />
      </div>
      <div className = "px-6 pt-5">
        <HomeCard />
      </div>
      <div className="pb-10 pl-2">
        <PromotionCardsContainer />
        <PublicEventCardsContainer />
      </div>
    </div>
  );
}

export default HomePage;
