import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Alert, Grid, Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Product } from "../../type";
import { OrderContext } from "../../contexts/OrderContext";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

export const ProductsView = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const { orderItems, setOrderItems }: any = useContext(OrderContext);
  const [cookies, ,] = useCookies(["access-token"]);

  const handleClick = async (product: any) => {
    setOrderItems([
      ...orderItems.filter(
        (item: any) => item.product !== product.id && item.id !== product.id
      ),
      product,
    ]);

    console.log("RUN FIRST", orderItems);

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
    const getProducts = async () => {
      try {
        const url = import.meta.env.VITE_BASE_URL + "/api/products";
        const response = await axios({
          method: "GET",
          url: url,
        });
        const newProducts = response.data["products"];
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  return products ? (
    <Grid container spacing={2} rowSpacing={5} justifyContent="center">
      {products.map((product: Product) => (
        <Grid key={product.id} item>
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              width: 300,
              flexGrow: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
            }}
          >
            <img
              className="thumbnail"
              src={product.imageUploadURL}
              alt={product.name}
            />
            <br />
            <a href="#">
              <strong>{product.name}</strong>
            </a>
            <hr />
            <Stack direction="row" justifyContent="space-between">
              <Button
                size="small"
                variant="contained"
                onClick={() => handleClick(product)}
              >
                Add to cart
              </Button>
              <h4>${product.price}</h4>
            </Stack>
          </Paper>
        </Grid>
      ))}
    </Grid>
  ) : (
    <Alert severity="error"> Your network is not working !</Alert>
  );
};
