import { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const { resetOrder } = useOrderDetails();

  useEffect(() => {
    const controller = new AbortController();
    axios.post("http://localhost:3030/order")
      .then(response => {
        setOrderNumber(response.data.orderNumber);
      })
      .catch(error => {
        setError(true);
      })
    return () => {
      controller.abort();
    }
  }, [])

  function handleNewOrderButtonClick(e) {
    resetOrder();
    setOrderPhase("entry");
  }
  if (!orderNumber && !error) {
    return "Loading";
  }
  const renderedOrder = (
    <>
      <h1>Thank You!</h1>
      <p>Your order number is {orderNumber}.</p>
      <small>As per our terms and conditions, nothing will happen now.</small>
    </>
  );
  return (
    <Container>
      {error ? <AlertBanner /> : renderedOrder}
      <Button variant="primary" onClick={handleNewOrderButtonClick}>Create new order</Button>
    </Container>
  );
}

export default OrderConfirmation;
