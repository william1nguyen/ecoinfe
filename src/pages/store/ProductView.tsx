import { Button } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { OrderContext } from "../../contexts/OrderContext";
import toast from "react-hot-toast";
import { Product } from "../../type";
import "./ProductView.css";

export const ProductView = () => {
  const params = useParams();
  const id = params.productId;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [digital, setDigital] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [instock, setInStock] = useState(true);
  const [updatedBy, setUpdatedBy] = useState("");
  const [cookies, ,] = useCookies(["access-token"]);

  const [product, setProduct] = useState<Product | null>(null);
  const { orderItems, setOrderItems }: any = useContext(OrderContext);

  const handleClick = async (product: any) => {
    setOrderItems([
      ...orderItems.filter(
        (item: any) => item.product !== product.id && item.id !== product.id
      ),
      product,
    ]);

    try {
      const url = import.meta.env.VITE_BASE_URL + "/api/order-items";
      const headers = {
        Authorization: "Bearer " + cookies["access-token"],
      };
      const data = {
        product_id: product.id,
      };

      await axios({
        method: "POST",
        url: url,
        headers: headers,
        data: data,
      });

      toast.success(`Add ${product.name} To Cart!`);
    } catch (error) {
      toast.error("Something Bad Happened!");
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      const url = import.meta.env.VITE_BASE_URL + `/api/products/${id}`;
      const headers = {
        Authorization: "Bearer " + cookies["access-token"],
      };
      const response: any = await axios({
        method: "GET",
        url: url,
        headers: headers,
      });
      const product: any = response["data"]["product"];
      setProduct(product);
      setName(product["name"]);
      setPrice(product["price"]);
      setDigital(product["digital"]);
      setImageUrl(product["imageUploadURL"]);
      setInStock(product["instock"]);
      setDescription(product["description"]);
      setUpdatedBy(product["updatedBy"]);
    };

    getProduct();
  }, []);

  return (
    <div className="product-card">
      <div className="image-container">
        <img
          className="product-image"
          src={imageUrl}
          alt={`product-${id}-${name}`}
        />
      </div>
      <div className="product-info">
        <div>
          <div>
            <h2>{name}</h2>
          </div>
          {description ? (
            <>
              <hr />
              <div>
                <h3>Description</h3>
                <p>{description}</p>
              </div>
            </>
          ) : (
            <></>
          )}
          <hr />
          {instock ? (
            <p style={{ color: "green" }}>In Stock</p>
          ) : (
            <p style={{ color: "red" }}>Out Of Stock</p>
          )}
          <div>
            <h3>${price}</h3>
          </div>
          <Button
            size="small"
            variant="contained"
            onClick={() => handleClick(product)}
          >
            Add to cart
          </Button>
          <p>
            Updated By: <span style={{ color: "green" }}>{updatedBy}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
