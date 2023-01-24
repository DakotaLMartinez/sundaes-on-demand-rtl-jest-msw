import { useState } from "react";
import Container from "react-bootstrap/Container";
import "./App.css";

import OrderEntry from "./pages/entry/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("entry");
  function renderPhase() {
    switch (orderPhase) {
      case "entry":
        return <OrderEntry setOrderPhase={setOrderPhase} />;
      case "summary":
        return <OrderSummary setOrderPhase={setOrderPhase} />;
      case "confirmation":
        return <OrderConfirmation setOrderPhase={setOrderPhase} />
      default:
    }
  }
  return (
    <Container className="App">
      <OrderDetailsProvider>{renderPhase()}</OrderDetailsProvider>
    </Container>
  );
}

export default App;
