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

function App() {
  return (
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
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </div>
  );
}

export default App;
