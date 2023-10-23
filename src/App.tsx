import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import MainLayout from "./components/MainLayout";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import TicketsPage from "./pages/TicketsPage";
import ItineraryPage from "./pages/ItineraryPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import { useAuthContext } from "./hooks/useAuthContext";
import SignupForm from "./components/AccountPage/SignupForm";
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import SignupPage from "./pages/SignUpPage";
import ViewProfilePage from "./pages/ViewProfilePage";
import EditProfilePage from "./pages/EditProfilePage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import RequestResetPasswordForm from "./components/AccountPage/RequestResetPasswordForm";
import ResetPasswordForm from "./components/AccountPage/ResetPasswordForm";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ListingPage from "./pages/PurchaseTicketManagement/ListingPage";
import SelectDateForm from "./components/TicketManagement/SelectDateForm";
import OrderReviewForm from "./components/TicketManagement/OrderReviewForm";
import CustOrGuest from "./components/TicketManagement/CustOrGuestPage";
import ListingForm from "./components/TicketManagement/ListingForm";
import PersonalDetails from "./components/TicketManagement/PersonalDetails";
import LoginPurchaseForm from "./components/AccountPage/LoginPurchaseForm";
import PaymentForm from "./components/TicketManagement/PaymentForm";
import CompletionPage from "./pages/PurchaseTicketManagement/CompletionPage";
import ViewPromotionPage from "./pages/Promotion/ViewPromotionPage";
import Successful from "./pages/PurchaseTicketManagement/Successful";
import TicketLandingPage from "./pages/TicketLandingPage";
import ViewPurchasedTicketsPage from "./pages/PurchaseTicketManagement/ViewPurchasedTicketsPage";
import LoginFormTicket from "./components/AccountPage/LoginFormTicket";
import LoginTicketPage from "./pages/LoginTicketPage";

function App() {
  const { state } = useAuthContext();
  const { user } = state;
  return (
    <PrimeReactProvider>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to={"/"} />}
            />
          </Routes>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/promotion/viewpromotion/:promotionId"
                element={<ViewPromotionPage />}
              />
              <Route path="/map" element={<MapPage />} />
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
              // need user in logged in state
              <Route
                path="/tickets/purchasedTickets"
                element={
                  user ? <ViewPurchasedTicketsPage /> : <LoginTicketPage />
                }
              />{" "}
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/viewProfile" element={<ViewProfilePage />} />
              <Route path="/editProfile" element={<EditProfilePage />} />
              <Route path="/changePassword" element={<ChangePasswordPage />} />
              <Route
                path="/requestResetPassword"
                element={<RequestResetPasswordForm />}
              />
              <Route
                path="/resetPasswordNew/:token"
                element={<ResetPasswordForm />}
              />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
