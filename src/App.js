import Container from "react-bootstrap/Container";
import "./App.css";

import OrderEntry from "./pages/entry/OrderEntry";
import SummaryForm from "./pages/summary/SummaryForm";
import { OrderDetailsProvider } from "./contexts/OrderDetails";

function App() {
  return (
    <Container className="App">
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
      <SummaryForm />
    </Container>
  );
}

export default App;
