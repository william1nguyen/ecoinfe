import "./Banner.css";
import { useState, useEffect } from "react";

export const Banner = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        'https://t4.ftcdn.net/jpg/03/32/95/71/360_F_332957101_NV588R5pQUyusBU22Wvzqqhq3E7pOPwb.jpg',
        'https://www.gloo.com.my/image/catalog/09promotion/202306/nologo_MNC_Summer_Gloo_banner_1090x450.jpg',
        'https://www.businessinsider.in/photo/99964822/amazon-great-summer-sale-best-deals-on-smartphones.jpg?imgsize=101558',
        'https://www.garmin.co.in/m/in/g/news/news-2023-apr-summer-sale.jpg',
    ]   

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="banner">
            <img src={images[currentImageIndex]} alt="Banner" className="banner-image" />
        </div>
    );
};