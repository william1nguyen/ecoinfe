import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { Route } from 'react-router-dom';

export const LoadingRoute = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    return (isLoading) ? <CircularProgress /> : <Route {...props} />;
};
