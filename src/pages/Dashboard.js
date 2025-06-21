import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBoxOpen } from "react-icons/fa";
import { API_URL } from "../utils/constants";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [totalProduk, setTotalProduk] = React.useState(0);

  // Ambil jumlah produk dari API saat mount
  React.useEffect(() => {
    axios.get(API_URL + "products").then((res) => {
      setTotalProduk(res.data.length);
    });
  }, []);

  return (
    <div
      className="mt-4"
      style={{
        minHeight: "100vh",
        background: "#1a237e",
        paddingTop: 40,
        paddingBottom: 40,
      }}
    >
      <h2 className="mb-4 text-center" style={{ color: "#fff" }}>
        Dashboard Kasir
      </h2>
      <Row className="mb-4 justify-content-center">
        <Col md={6}>
          <Card
            style={{ background: "#fff", color: "#1a237e" }}
            className="mb-3 shadow text-center"
          >
            <Card.Body>
              <FaBoxOpen size={48} className="mb-3" />
              <Card.Title style={{ fontSize: "1.5rem" }}>
                Total Produk
              </Card.Title>
              <Card.Text style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                {totalProduk}
              </Card.Text>
              <div style={{ marginTop: 20 }}>
                <img
                  src="https://undraw.co/api/illustrations/undraw_add_to_cart_re_wrdo.svg"
                  alt="Produk"
                  style={{ width: 120, opacity: 0.8 }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="text-center mt-4">
        <h5 style={{ color: "#fff" }}>
          Selamat datang di Dashboard Kasir! <br />
          Kelola produk dengan mudah dan tingkatkan penjualanmu 🚀
        </h5>
        <Button
          style={{
            background: "#fff",
            color: "#1a237e",
            borderColor: "#fff",
            fontWeight: "bold",
            fontSize: "1.1rem",
            width: 180,
            marginTop: 24,
          }}
          className="mx-2"
          onClick={() => navigate("/")}
        >
          Ke Kasir
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;