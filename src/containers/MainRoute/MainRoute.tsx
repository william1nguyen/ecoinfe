import React from "react";
import { Route, useNavigate } from "react-router-dom";
import { LoginContext } from "../../contexts/LoginContext";

export const MainRoute = (props: any) => {
  const { isLoggedIn }: any = React.useContext(LoginContext);
  const navigate = useNavigate();

  return isLoggedIn ? <Route {...props} /> : () => navigate("/login");
};
