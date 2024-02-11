import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export const LoadingRoute = ({ element }: any) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return isLoading ? <CircularProgress /> : <div>{element}</div>;
};
