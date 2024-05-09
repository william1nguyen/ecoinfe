import "./PopularItems.css";
import { ProductsView } from "../../containers/Products/Products";

export const PopularItems = () => {
    return (
        <div className="week-hot-sale-container">
            <h1>
                <img id="flashsale-icon" 
                    src="https://github.com/enwcoin/ecoinfe/blob/78b636dc0994abfe466d11293c1c9b4920233b89/src/assets/flashsale_icon.png"
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