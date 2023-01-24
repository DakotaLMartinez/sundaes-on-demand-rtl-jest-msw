import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    const controller = new AbortController();
    axios.post("http://localhost:3030/order")
      .then(response => {
        setOrderNumber(response.data.orderNumber);
      })
    return () => {
      controller.abort();
    }
  }, [])

  function handleNewOrderButtonClick(e) {
    resetOrder();
    setOrderPhase("entry");
  }
  if (!orderNumber) {
    return "Loading";
  }
  return (
    <Container>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}.</p>
      <small>As per our terms and conditions, nothing will happen now.</small>
      <Button variant="primary" onClick={handleNewOrderButtonClick}>Create new order</Button>
    </Container>
  );
}

export default OrderConfirmation;
