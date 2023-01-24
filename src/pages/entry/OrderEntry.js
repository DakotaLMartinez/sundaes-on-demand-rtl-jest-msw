import React from "react";
import Options from "./Options";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

function OrderEntry({ setOrderPhase }) {
  const { totals } = useOrderDetails();
  const grandTotal = formatCurrency(totals.toppings + totals.scoops);
  function onSundaeOrder(e) {
    setOrderPhase("summary");
  }
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {grandTotal}</h2>
      <Button
        variant="primary"
        disabled={totals.scoops === 0}
        onClick={onSundaeOrder}
      >
        Order Sundae!
      </Button>
    </div>
  );
}

export default OrderEntry;
