import "./App.css";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupPage } from "./pages/auth/SignupPage";
import { Store } from "./pages/store/Store";
import { BrowserRouter, Switch } from 'react-router-dom';
import { HideAppBar } from "./components/NavBar/HideNavBar";
import { useEffect } from "react";
import { Cart } from "./pages/store/Cart";
import { OrderProvider } from "./context/OrderContext";
import { LoadingRoute } from "./containers/LoadingRoute/LoadingRoute";
import { Settings } from "./pages/settings/Settings";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const App = () => {
  useEffect(() => {
    document.title = "Ecom";
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <OrderProvider>
        <HideAppBar />
        <div style={{padding: "2rem", margin: "0 auto"}}>
          <BrowserRouter>
            <Switch>
              <LoadingRoute path="/login" component={LoginPage} />
              <LoadingRoute path="/signup" component={SignupPage} />
              <LoadingRoute path="/orders/me" component={Cart} />
              <LoadingRoute path="/settings" component={Settings} />
              <LoadingRoute path="/" component={Store} />
            </Switch>
          </BrowserRouter>
        </div>
      </OrderProvider>
    </LocalizationProvider>
  );
}

export default App;