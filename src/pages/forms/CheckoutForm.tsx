import React, { useContext, useState } from "react";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { Heading } from "../../components/Heading";
import { Button } from "../../components/Button";
import "./PaymentForm.css";
import { useCookies } from "react-cookie";
import axios from "axios";
import { OrderContext } from "../../contexts/OrderContext";

const TAX_RATE = 0.1;

interface CheckoutFormProps {
  handleSetPaymentSuccess: () => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  handleSetPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["access-token", "order_items"]);
  const { orderItems, setOrderItems }: any = useContext(OrderContext);

  const totalCartValue = (orderItems: any) => {
    const tempInvoiceSubtotal = orderItems.reduce(
      (accumulator: any, item: any) => accumulator + item.total_price,
      0
    );
    const tempInvoiceTaxes = tempInvoiceSubtotal * TAX_RATE;
    const tempInvoiceTotal = tempInvoiceSubtotal + tempInvoiceTaxes;
    return tempInvoiceTotal;
  };

  const saveAndRemoveOrder = async () => {
    const url = import.meta.env.VITE_BASE_URL + "/api/orders";
    const headers = {
      Authorization: "Bearer " + cookies["access-token"],
    };
    await axios({
      method: "PUT",
      url: url,
      headers: headers,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");
          saveAndRemoveOrder();
          setOrderItems([]);
          setCookie("order_items", "");
          handleSetPaymentSuccess();
        }

        setIsLoading(false);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      id="payment-form"
      style={{ marginBottom: "1.5rem" }}
    >
      <div style={{ marginBottom: "1.5rem" }}>
        <Heading title="Enter your details to complete checkout!" center />
      </div>
      <h2
        style={{
          fontWeight: "bold",
          marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        Address Information
      </h2>
      <AddressElement
        options={{
          mode: "shipping",
          allowedCountries: ["US", "VN"],
        }}
      />
      <h2
        style={{
          fontWeight: "bold",
          marginTop: "1rem",
          marginBottom: "0.5rem",
        }}
      >
        Payment Information
      </h2>
      <PaymentElement
        id="payment-element"
        options={{
          layout: "tabs",
        }}
      />
      <div
        style={{
          padding: "1rem",
          textAlign: "center",
          color: "#778899",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Total: ${totalCartValue(orderItems)}
      </div>
      <Button
        label={isLoading ? "Processing" : "Pay now"}
        disabled={isLoading || !stripe || !elements}
        onClick={() => {}}
      />
    </form>
  );
};
