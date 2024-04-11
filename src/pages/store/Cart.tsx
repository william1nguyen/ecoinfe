import { Button } from "@mui/material";
import { TablePrice } from "../../components/Cart/TablePrice";
import { Send } from "@mui/icons-material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useContext, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../forms/CheckoutForm";
import { useNavigate } from "react-router-dom";

const TAX_RATE = 0.1;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

export const Cart = () => {
  const [cookies] = useCookies(["access-token", "order_items"]);
  const { orderItems }: any = useContext(OrderContext);
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  const totalCartValue = (orderItems: any) => {
    const tempInvoiceSubtotal = orderItems.reduce(
      (accumulator: any, item: any) => accumulator + item.total_price,
      0
    );
    const tempInvoiceTaxes = tempInvoiceSubtotal * TAX_RATE;
    const tempInvoiceTotal = tempInvoiceSubtotal + tempInvoiceTaxes;
    return tempInvoiceTotal;
  };

  const handleSetPaymentSuccess = () => {
    navigate("/");
  };

  const handleClick = async () => {
    const url =
      import.meta.env.VITE_API_ROOT + "/payment/create-checkout-session";
    const headers = {
      Authorization: "Bearer " + cookies["access-token"],
    };
    const tCartValue = totalCartValue(orderItems);
    if (!tCartValue) {
      // Cart Is Empty Case
      toast.error("Cart Is Empty!");
      return;
    }
    const data = {
      amount: tCartValue,
    };

    const response = await axios({
      method: "POST",
      url: url,
      headers: headers,
      data: data,
    });

    const clientSecret = response["data"]["clientSecret"];
    setClientSecret(clientSecret);

    if (response.status === 200) {
      setClientSecret(clientSecret);
    } else {
      toast.error("Payment failed!");
    }
  };

  const appearance: any = {
    theme: "stripe",
  };
  const options: any = {
    clientSecret,
    appearance,
  };

  return clientSecret ? (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm handleSetPaymentSuccess={handleSetPaymentSuccess} />
    </Elements>
  ) : (
    <>
      <TablePrice />
      <br />
      <br />
      <Button variant="contained" endIcon={<Send />} onClick={handleClick}>
        Check out
      </Button>
    </>
  );
};
