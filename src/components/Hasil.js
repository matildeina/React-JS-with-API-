import React, { useState } from "react";
import { Col, ListGroup, Row, Badge } from "react-bootstrap";
import ModalKeranjang from "./ModalKeranjang";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { numberWithComas } from "../utils/utils";

const Hasil = ({ keranjangs, loadKeranjangs }) => {
  const [showModal, setShowModal] = useState(false);
  const [keranjangEdit, setKeranjangEdit] = useState(null);

  // Untuk buka modal edit
  const handleEdit = (keranjang) => {
    setKeranjangEdit(keranjang);
    setShowModal(true);
  };

  // Untuk simpan edit
  const handleSave = (data) => {
    axios.put(API_URL + "keranjangs/" + data.id, data).then(() => {
      setShowModal(false);
      setKeranjangEdit(null);
      loadKeranjangs();
    });
  };

const handleDelete = (id) => {
  return axios.delete(API_URL + "keranjangs/" + id).then(() => {
    setShowModal(false);
    setKeranjangEdit(null);
    loadKeranjangs();
  });
};

  // Total bayar
  const totalBayar = keranjangs.reduce(
    (total, item) => total + item.product.harga * item.jumlah,
    0
  );

  return (
    <Col md={3} mt="2">
      <h4>
        <strong>Hasil</strong>
      </h4>
      <hr />
      {keranjangs.length !== 0 && (
        <ListGroup variant="flush">
          {keranjangs.map((keranjang) =>
            keranjang.product && keranjang.product.nama ? (
              <ListGroup.Item
                key={keranjang.id}
                style={{ cursor: "pointer" }}
                onClick={() => handleEdit(keranjang)}
              >
                <Row>
                  <Col xs={2}>
                    <h4>
                      <Badge pill variant="success">
                        {keranjang.jumlah}
                      </Badge>
                    </h4>
                  </Col>
                  <Col>
                    <h5>{keranjang.product.nama}</h5>
                    <p>Rp. {numberWithComas(keranjang.product.harga)}</p>
                  </Col>
                  <Col>
                    <strong className="float-right">
                      Rp. {numberWithComas(keranjang.total_harga)}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
            ) : null
          )}
        </ListGroup>
      )}
      <h5>Total Bayar: Rp {totalBayar.toLocaleString()}</h5>

      {/* ✅ Kirim handleDelete ke Modal */}
      <ModalKeranjang
        show={showModal}
        handleClose={() => setShowModal(false)}
        keranjang={keranjangEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
      />
    </Col>
  );
};

export default Hasil;
