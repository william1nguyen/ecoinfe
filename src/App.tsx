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

const App = () => {
  useEffect(() => {
    document.title = "Ecom";
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LoginProvider>
        <OrderProvider>
          <Toaster
            toastOptions={{
              style: {
                background: "rgb(51, 65, 85)",
                color: "#fff",
              },
            }}
          />
          <HideAppBar />
          <div style={{ padding: "2rem", margin: "0 auto" }}>
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
              <Route path="/" element={<LoadingRoute element={<Store />} />} />
            </Routes>
          </div>
        </OrderProvider>
      </LoginProvider>
    </LocalizationProvider>
  );
};

export default App;
