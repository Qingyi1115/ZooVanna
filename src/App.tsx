import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { PrimeReactProvider } from "primereact/api";
import AppUrlListener from "./components/AppUrlListener";
import MainLayout from "./components/MainLayout";
import CustOrGuest from "./components/TicketManagement/CustOrGuestPage";
import ListingForm from "./components/TicketManagement/ListingForm";
import OrderReviewForm from "./components/TicketManagement/OrderReviewForm";
import PaymentForm from "./components/TicketManagement/PaymentForm";
import PersonalDetails from "./components/TicketManagement/PersonalDetails";
import SelectDateForm from "./components/TicketManagement/SelectDateForm";
import { useAuthContext } from "./hooks/useAuthContext";
import AccountPage from "./pages/AccountPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CheckYourInbox from "./pages/CheckYourInbox";
import EditProfilePage from "./pages/EditProfilePage";
import HomePage from "./pages/HomePage";
import ItineraryPage from "./pages/Itinerary/ItineraryPage";
import LoginPage from "./pages/LoginPage";
import LoginTicketPage from "./pages/LoginTicketPage";
import MapPage from "./pages/Map/MapPage";
import ViewPromotionPage from "./pages/Promotion/ViewPromotionPage";
import CompletionPage from "./pages/PurchaseTicketManagement/CompletionPage";
import ListingPage from "./pages/PurchaseTicketManagement/ListingPage";
import Successful from "./pages/PurchaseTicketManagement/Successful";
import ViewPurchasedTicketsPage from "./pages/PurchaseTicketManagement/ViewPurchasedTicketsPage";
import RequestResetPasswordPage from "./pages/RequestResetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupEmailPage from "./pages/SignUpEmailPage";
import SignupPage from "./pages/SignUpPage";
import TicketLandingPage from "./pages/TicketLandingPage";
import TicketsPage from "./pages/TicketsPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import ViewFacilityDetailsPage from "./pages/Map/ViewFacilityDetailsPage";
import ViewAllPublicEventsPage from "./pages/PublicEvent/ViewAllPublicEventsPage";
import ViewPublicEventDetailsPage from "./pages/PublicEvent/ViewPublicEventPage";
import ViewAllSpeciesPage from "./pages/Species/ViewAllSpeciesPage";
import ViewSpeciesDetailsPage from "./pages/Species/ViewSpeciesDetailsPage";
import ViewAllAnnouncementsPage from "./pages/Announcement/ViewAllAnnouncementsPage";
import ViewAnnouncementDetailsPage from "./pages/Announcement/ViewAnnouncementDetailsPage";
import ViewAllFavouritesPage from "./pages/Favourites/ViewAllFavouritesPage";
import ViewNotFavouritesPage from "./pages/Favourites/ViewNotFavouritesPage";
import CreateItineraryPage from "./pages/Itinerary/CreateItineraryPage";
import BasicItineraryForm from "./components/ItineraryPage/BasicItineraryForm";
import SelectPlaces from "./components/ItineraryPage/SelectPlaces";
import Generate from "./components/ItineraryPage/Generate";
import ReportFaultyFacilityPage from "./pages/Map/ReportFaultyFacilityPage";
import ViewItinerary from "./components/ItineraryPage/ViewItinerary";
import EditBasicItineraryForm from "./components/ItineraryPage/EditBasicItineraryForm";
import EditSelectPlaces from "./components/ItineraryPage/editSelectPlaces";
import EditGenerate from "./components/ItineraryPage/EditGenerate";

function App() {
  const { state } = useAuthContext();
  const { user } = state;
  return (
    <PrimeReactProvider>
      <div className="">
        <BrowserRouter>
          <AppUrlListener></AppUrlListener>
          <Routes>
            {/* <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to={"/"} />}
            /> */}
          </Routes>
          <MainLayout>
            <Routes>
              {/* Home */}
              <Route path="/" element={<HomePage />} />
              <Route
                path="/announcement/viewannouncement/:announcementId"
                element={<ViewAnnouncementDetailsPage />}
              />
              <Route
                path="/announcement/viewAllAnnouncements"
                element={<ViewAllAnnouncementsPage />}
              />
              <Route
                path="/promotion/viewpromotion/:promotionId"
                element={<ViewPromotionPage />}
              />
              <Route
                path="/event/viewevent/:publicEventId"
                element={<ViewPublicEventDetailsPage />}
              />
              <Route
                path="/event/viewAllEvents"
                element={<ViewAllPublicEventsPage />}
              />
              <Route
                path="/species/viewAllSpecies"
                element={<ViewAllSpeciesPage />}
              />
              <Route
                path="/species/viewspecies/:speciesCode"
                element={<ViewSpeciesDetailsPage />}
              />

              {/* Map Management */}
              <Route path="/map" element={<MapPage />} />
              <Route
                path="/facility/viewfacility/:facilityId"
                element={<ViewFacilityDetailsPage />}
              />
              <Route
                path="/facility/reportFaultyFacility/:facilityId"
                element={<ReportFaultyFacilityPage />}
              />

              {/*Ticket Management*/}
              <Route path="/tickets" element={<TicketLandingPage />} />
              <Route path="/tickets/buy" element={<TicketsPage />} />
              <Route path="/tickets/selectListing" element={<ListingPage />} />
              <Route path="/tickets/selectDate" element={<SelectDateForm />} />
              <Route
                path="/tickets/orderReview"
                element={<OrderReviewForm />}
              />
              <Route
                path="/tickets/selectListing/listingForm"
                element={<ListingForm />}
              />
              <Route
                path="tickets/personalDetails"
                element={<PersonalDetails />}
              />
              <Route path="/tickets/custOrGuest" element={<CustOrGuest />} />
              <Route
                path="/tickets/custOrGuest/listingForm"
                element={<ListingForm />}
              />
              <Route path="/tickets/payment" element={<PaymentForm />} />
              <Route path="/success" element={<Successful />} />
              <Route
                path="/tickets/completion/:customerOrderId/:code/:id"
                element={<CompletionPage />}
              />
              <Route
                path="/tickets/purchasedTickets"
                element={
                  user ? <ViewPurchasedTicketsPage /> : <LoginTicketPage />
                }
              />
              {/*Events */}
              <Route path="/allEvents" element={<ViewAllPublicEventsPage />} />

              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signupemail" element={<SignupEmailPage />} />
              <Route path="/inbox" element={<CheckYourInbox />} />
              <Route path="/signup/:token" element={<SignupPage />} />
              <Route path="/viewProfile" element={<ViewProfilePage />} />
              <Route path="/editProfile" element={<EditProfilePage />} />
              <Route path="/changePassword" element={<ChangePasswordPage />} />
              <Route
                path="/requestResetPassword"
                element={<RequestResetPasswordPage />}
              />
              <Route
                path="/resetPasswordNew/:token"
                element={<ResetPasswordPage />}
              />
              {/*Favourite Attraction */}
              <Route path="/favourites" element={<ViewAllFavouritesPage />} />
              <Route
                path="/notFavourites"
                element={<ViewNotFavouritesPage />}
              />

              {/*Itinerary */}
              <Route
                path="/createItinerary"
                element={<CreateItineraryPage />}
              />
              <Route path="/basicItinerary" element={<BasicItineraryForm />} />
              <Route path="/selectPlaces" element={<SelectPlaces />} />
              <Route path="/generatePlaces" element={<Generate />} />
              <Route
                path="/viewItinerary/:itineraryId"
                element={<ViewItinerary />}
              />
              <Route
                path="/editBasicItinerary"
                element={<EditBasicItineraryForm />}
              />
              <Route path="/editSelectPlaces" element={<EditSelectPlaces />} />
              <Route path="/editGeneratePlaces" element={<EditGenerate />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
