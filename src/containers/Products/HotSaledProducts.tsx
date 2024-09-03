import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Grid, Pagination, Paper } from "@mui/material";
import { Button } from "@mui/material";
import { Stack } from "@mui/material";
import { Product } from "../../type";
import { OrderContext } from "../../contexts/OrderContext";
import { useCookies } from "react-cookie";
import { truncate } from "../../utilities/truncate";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

export const HotSaledProducts = () => {
  const pageSize = 5;
  const [products, setProducts] = useState<Product[] | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { orderItems, setOrderItems }: any = useContext(OrderContext);
  const [cookies, ,] = useCookies(["access-token"]);

  const handleClick = async (product: any) => {
    setOrderItems([
      ...orderItems.filter(
        (item: any) => item.product !== product.id && item.id !== product.id
      ),
      product,
    ]);

    try {
      const url = import.meta.env.VITE_API_ROOT + "/api/order-items";
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
        const url = import.meta.env.VITE_API_ROOT + `/api/products?is_hot_saled=true&&page=${currentPage}`;
        const response = await axios({
          method: "GET",
          url: url,
        });
        const newProducts = response.data["results"];
        const productsLength = response.data["count"];
        setPageNumber(Math.floor((productsLength + pageSize - 1) / pageSize));
        setProducts(newProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [currentPage]);

  const handlePageChange = (event: React.ChangeEvent<unknown>) => {
    const newPage = parseInt((event.target as HTMLInputElement).innerText);
    setCurrentPage(newPage);
  };

  return products ? (
    <>
      <Grid container spacing={2} rowSpacing={5} justifyContent="center">
        {products.map((product: Product) => (
          <Grid key={product.id} item>
            <Paper
              sx={{
                p: 1,
                margin: "auto",
                width: 250,
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
              <a href={`/products/${product.id}`}>
                <strong>{truncate(product.name)}</strong>
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
      <Pagination count={pageNumber} 
        page={currentPage}
        color="primary" 
        size="large"
        style={{
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          padding: "10px",
          marginTop: "20px"
        }} 
        onChange={handlePageChange}
      />
    </>
  ) : (
    <CircularProgress />
  );
};
