import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

const TotalBayar = ({ keranjangs }) => {
  const navigate = useNavigate();

  const totalBayar = Array.isArray(keranjangs)
    ? keranjangs.reduce(
        (total, item) =>
          item.product && item.product.harga && item.jumlah
            ? total + item.product.harga * item.jumlah
            : total,
        0
      )
    : 0;

  const handleBayar = async () => {
    // Hapus semua item keranjang satu per satu
    await Promise.all(
      keranjangs.map((item) => axios.delete(API_URL + "keranjangs/" + item.id))
    );
    navigate("/sukses");
  };

  return (
    <div
      className="fixed-bottom"
      style={{
        background: "#fff",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.05)",
        padding: "20px 0 10px 0",
      }}
    >
      <Row className="align-items-center" style={{ marginBottom: 0 }}>
        <Col xs={6}>
          <h5 style={{ marginLeft: "10px", marginBottom: 0 }}>
            <strong>Total Harga :</strong>
          </h5>
        </Col>
        <Col xs={6}>
          <h2
            style={{ textAlign: "right", marginRight: "10px", marginBottom: 0 }}
          >
            <strong>Rp. {totalBayar.toLocaleString()}</strong>
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button
            style={{
              background: "#1a237e", // biru navy
              borderColor: "#1a237e",
              fontWeight: "bold",
              fontSize: "1.2rem",
              width: "60%",
              display: "block",
              margin: "20px auto 0 auto",
            }}
            size="lg"
            className="mt-2"
            onClick={handleBayar}
          >
            <FaShoppingCart /> BAYAR
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TotalBayar;
