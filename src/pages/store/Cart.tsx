import { Button } from "@mui/material";
import { TablePrice } from "../../components/Cart/TablePrice";
import { Send } from "@mui/icons-material";

export const Cart = () => {
  return (
    <>
      <TablePrice />
      <br />
      <br />
      <Button variant="contained" endIcon={<Send />}>
        Check out
      </Button>
    </>
  );
};
