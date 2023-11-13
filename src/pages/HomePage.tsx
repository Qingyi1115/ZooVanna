import PublicEventCardsContainer from "../components/HomePage/PublicEvent/PublicEventCardsContainer";
import PromotionCardsContainer from "../components/HomePage/Promotion/PromotionCardsContainer";

function HomePage() {
  return (
    <div className="flex h-screen flex-col p-6">
      {/* <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="link">Link</Button> */}
      <div className="mb-3 pt-4">
        <h1 className="px-4 text-2xl font-bold">Merlion Zoo</h1>
      </div>
      <PromotionCardsContainer />
      <PublicEventCardsContainer />
    </div>
  );
}

export default HomePage;
