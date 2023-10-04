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

function App() {
  return (
    <PrimeReactProvider>
      <div className="">
        <BrowserRouter>
          {/* <Routes>
            <Route
              path="/login"
              element={!user ? <LoginPage /> : <Navigate to={"/"} />}
            />
          </Routes> */}
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/tickets/selectListing" element={<ListingPage />} />
              <Route path="/tickets/selectDate" element={<SelectDateForm />} />

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
