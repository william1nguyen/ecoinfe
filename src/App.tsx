import "./App.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { Store } from "./pages/store/Store";
import { Route, Routes } from "react-router-dom";
import { HideAppBar } from "./components/NavBar/HideNavBar";
import { useEffect } from "react";
import { Cart } from "./pages/store/Cart";
import { OrderProvider } from "./contexts/OrderContext";
import { LoadingRoute } from "./containers/LoadingRoute/LoadingRoute";
import { Settings } from "./pages/settings/Settings";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Toaster } from "react-hot-toast";
import { LoginProvider } from "./contexts/LoginContext";
import { ProductView } from "./pages/store/ProductView";
import { Footer } from "./components/Footer/Footer";
import { WelcomePage } from "./pages/welcome/WelcomPage";
import iconUrl from './assets/react.svg';
import { SearchProvider } from "./contexts/SearchContext";

const App = () => {
  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement
    if (favicon) {
      favicon.href = iconUrl;
    }
    document.title = "ECOIN";
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LoginProvider>
        <OrderProvider>
          <SearchProvider>
            <Toaster
              toastOptions={{
                style: {
                  background: "rgb(51, 65, 85)",
                  color: "#fff",
                },
              }}
            />
            <div className="app-container">
              <HideAppBar />
              <div style={{ padding: "2rem", margin: "0 auto" }} className="content">
                <Routes>
                  <Route
                    path="/login"
                    element={<LoadingRoute element={<LoginPage />} />}
                  />
                  <Route
                    path="/signup"
                    element={<LoadingRoute element={<SignupPage />} />}
                  />
                  <Route
                    path="/orders/me"
                    element={<LoadingRoute element={<Cart />} />}
                  />
                  <Route
                    path="/settings"
                    element={<LoadingRoute element={<Settings />} />}
                  />
                  <Route path="/" element={<LoadingRoute element={<WelcomePage />} />} />
                  <Route path="/store/devices/:devices" element={<LoadingRoute element={<Store />} />} />
                  <Route path="/store/brand/:brand" element={<LoadingRoute element={<Store />} />} />
                  <Route path="/store" element={<LoadingRoute element={<Store />} />} />
                  <Route
                    path="/products/:productId"
                    element={<LoadingRoute element={<ProductView />} />}
                  />
                </Routes>
              </div>
              <Footer />
            </div>
          </SearchProvider>
        </OrderProvider>
      </LoginProvider>
    </LocalizationProvider>
  );
};

export default App;
