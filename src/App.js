import { useState } from "react";
import Container from "react-bootstrap/Container";
import Accordion from "react-bootstrap/Accordion";
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
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>About this App</Accordion.Header>
          <Accordion.Body>
            <p>
              This application is a companion to Bonnie Schulkin's course on{" "}
              <a
                href="https://www.udemy.com/course/react-testing-library/"
                target="_blank"
                rel="noreferrer"
              >
                Testing React with Jest and React Testing Library
              </a>
              . I really enjoyed getting to dive into JEST and RTL and use them
              in a project. The application utilizes the Context API for sharing
              information and behavior across multiple related components, so I
              got practice with setting up tests that provide a wrapper around
              the rendered component. I also got another chance to work with the
              mock service worker (msw) package that I was really excited about
              for its teaching potential.
            </p>
            <p>
              The course focuses on functional testing–finding UI elements by
              their accessible roles and ensuring that the user interactions
              lead to the desired result. One of the great side effects of this
              is that the tests are coupled with the desired behavior rather
              than with a particular implementation. When I made a couple of
              changes after completing the coursework to prepare it for
              deployment, I was able to easily make a couple of small updates to
              the tests so that they aligned with the new behavior. NOTE: This
              application doesn't persist any data and is actually using MSW in
              production here to simulate having a running server. Feel free to
              check out the{" "}
              <a href="https://github.com/DakotaLMartinez/sundaes-on-demand-rtl-jest-msw" target="_blank" rel="noreferrer">
                code on GitHub
              </a>{" "}
              for more info on how this is done.
            </p>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Other Notes & Todos</Accordion.Header>
          <Accordion.Body>
            This application as built in the course only allows for a single cup
            (or cone!) of ice cream to be ordered at a time. One fun add on
            would be to allow multiple cups/cones to be added to the same order.
            This would involve changes to the structure of the `OrderDetails`
            context and additional UI elements within the `OrderEntry` component
            logic to allow for additional cups/cones to be added to a single
            order. This would also involve channges to the `OrderSummary` to
            include multiple cups/cones instead of a single one.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <OrderDetailsProvider>{renderPhase()}</OrderDetailsProvider>
    </Container>
  );
}

export default App;
