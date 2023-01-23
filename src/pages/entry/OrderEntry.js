import React from "react";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

function OrderEntry() {
  const { totals } = useOrderDetails();
  const grandTotal = formatCurrency(totals.toppings + totals.scoops);
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {grandTotal}</h2>
    </div>
  );
}

export default OrderEntry;
