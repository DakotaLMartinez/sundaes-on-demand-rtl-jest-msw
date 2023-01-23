import React from "react";
import Col from "react-bootstrap/Col";

function ToppingOption({ name, imagePath }) {
  return <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: 'center' }}>
    <img src={imagePath} alt={`${name} topping`} />
  </Col>;
}

export default ToppingOption;
