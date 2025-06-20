import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";

export default class Hasil extends Component {
  render() {
    const { keranjangs } = this.props;
    return (
      <Col md={3} mt="2">
        <h4>
          <strong>Hasil</strong>
        </h4>
        <hr />
        {keranjangs.length !== 0 && (
        <ListGroup variant="flush">
          {keranjangs.map((menuKeranjang) =>(
            <ListGroup.Item>
              {menuKeranjang.product.nama}
            </ListGroup.Item>
          ))}
          
         
        </ListGroup>
        )}
      </Col>
    );
  }
}
