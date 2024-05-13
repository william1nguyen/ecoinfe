import "./HotSaledItems.css";
import { HotSaledProducts } from "../../containers/Products/HotSaledProducts";
import FlashSaleIconURL from "../../assets/flashsale_icon.png";

export const HotSaledItems = () => {
    return (
        <div className="week-hot-sale-container">
            <h1>
                <img id="flashsale-icon" 
                    src={FlashSaleIconURL}
                    alt="flashsale_icon" 
                    sizes="small" 
                />
                WEEKEND HOT 
                <span> SALE</span>
            </h1>
            <HotSaledProducts />
        </div>
    )
}