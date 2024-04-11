import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CookiesProvider defaultSetOptions={{ path: "/" }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CookiesProvider>
);
