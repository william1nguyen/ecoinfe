import "./Main.css";
import { Products } from "../../containers/Products/Products";
import { useParams } from "react-router-dom";

export const Store= () => {
    const { devices, brand } = useParams();

    if (devices)
        return <Products devices={devices} />;
    else
        return <Products brand={brand} />;
};