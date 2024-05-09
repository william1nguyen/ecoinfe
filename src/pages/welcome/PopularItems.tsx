import "./PopularItems.css";
import { ProductsView } from "../../containers/Products/Products";
import FlashSaleIconURL from "../../assets/flashsale_icon.png";

export const PopularItems = () => {
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
            <ProductsView />
        </div>
    )
}