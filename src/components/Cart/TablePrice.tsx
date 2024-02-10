import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { OrderContext } from "../../contexts/OrderContext";
import { NumberInput } from "../NumberInput/NumberInput";
import { useCookies } from "react-cookie";
import axios from "axios";

const TAX_RATE = 0.1;

function ccyFormat(num: number) {
  return num ? `${num.toFixed(2)}` : 0;
}

export const TablePrice = () => {
  const { orderItems, setOrderItems }: any = useContext(OrderContext);
  const [invoiceSubtotal, setInvoiceSubtotal] = useState(0);
  const [invoiceTaxes, setInvoiceTaxes] = useState(0);
  const [invoiceTotal, setInvoiceTotal] = useState(0);
  const [cookies, ,] = useCookies(["access-token"]);

  useEffect(() => {
    const tempInvoiceSubtotal = orderItems.reduce(
      (accumulator: any, item: any) => accumulator + item.total_price,
      0
    );
    const tempInvoiceTaxes = tempInvoiceSubtotal * TAX_RATE;
    const tempInvoiceTotal = tempInvoiceSubtotal - tempInvoiceTaxes;
    setInvoiceSubtotal(tempInvoiceSubtotal);
    setInvoiceTaxes(tempInvoiceTaxes);
    setInvoiceTotal(tempInvoiceTotal);
  }, [orderItems]);

  const handleChangeQuantity = async (
    _event: any,
    orderItem: any,
    value: any
  ) => {
    try {
      const url = import.meta.env.VITE_BASE_URL + "/api/order-items";
      const headers = {
        Authorization: "Bearer " + cookies["access-token"],
      };
      const data = {
        id: orderItem.id,
        quantity: value,
      };

      await axios({
        method: "PUT",
        url: url,
        headers: headers,
        data: data,
      });

      if (value) {
        setOrderItems((prevOrderItems: any[]) => {
          const updatedOrderItems = prevOrderItems.map((item) =>
            item.id === orderItem.id
              ? {
                  ...item,
                  quantity: value,
                  total_price: value * item.unit_price,
                }
              : item
          );
          return updatedOrderItems;
        });
      } else {
        setOrderItems(orderItems.filter((item: any) => item != orderItem));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} aria-label="table price">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={3}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Items</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Qantity.</TableCell>
            <TableCell align="right">Sum</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderItems
            ? orderItems.map((orderItem: any) => (
                <TableRow key={orderItem.id}>
                  <TableCell>{orderItem.name}</TableCell>
                  <TableCell align="right">${orderItem.unit_price}</TableCell>
                  <TableCell align="right" sx={{ maxWidth: 2 }}>
                    <NumberInput
                      aria-label="quantity"
                      placeholder="Type a number…"
                      value={orderItem.quantity}
                      onChange={(event, value) =>
                        handleChangeQuantity(event, orderItem, value)
                      }
                      readOnly
                    />
                  </TableCell>
                  <TableCell align="right">
                    ${ccyFormat(orderItem.total_price)}
                  </TableCell>
                </TableRow>
              ))
            : null}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">${ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(
              0
            )} %`}</TableCell>
            <TableCell align="right">${ccyFormat(invoiceTaxes)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">${ccyFormat(invoiceTotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
