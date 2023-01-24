import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger
        trigger={["hover", "focus"]}
        placement="right"
        overlay={popover}
      >
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  function onConfirmation(e) {
    setOrderPhase("confirmation");
  }

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button
        variant="primary" 
        type="submit" 
        disabled={!tcChecked}
        onClick={onConfirmation}
      >
        Confirm order
      </Button>
    </Form>
  );
}

export default SummaryForm;
