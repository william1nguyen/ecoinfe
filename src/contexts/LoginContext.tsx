import { createContext, useState } from "react";
import { useCookies } from "react-cookie";

export const LoginContext = createContext({});

export const LoginProvider = ({ children }: any) => {
  const [cookies, ,] = useCookies(["isLoggedIn"]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(
    cookies["isLoggedIn"] ? cookies["isLoggedIn"] : false
  );

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};
