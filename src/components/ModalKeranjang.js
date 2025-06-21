import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import swal from "sweetalert";

const ModalKeranjang = ({
  show,
  handleClose,
  keranjang,
  handleSave,
  handleDelete,
}) => {
  const [jumlah, setJumlah] = useState(1);
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    if (keranjang) {
      setJumlah(keranjang.jumlah);
      setKeterangan(keranjang.keterangan || "");
    }
  }, [keranjang]);

  if (!keranjang) return null;

  const totalHarga = keranjang.product.harga * jumlah;

  const tambah = () => setJumlah(jumlah + 1);
  const kurang = () => jumlah > 1 && setJumlah(jumlah - 1);

  const onSave = () => {
    handleSave({
      ...keranjang,
      jumlah,
      total_harga: totalHarga,
      keterangan,
    });

    swal({
      title: "Berhasil di Edit!",
      text: `Pesanan ${keranjang.product.nama} berhasil diubah.`,
      icon: "success",
      button: false,
      timer: 1500,
    });

    handleClose();
  };

  const onDelete = () => {
  handleDelete(keranjang.id).then(() => {
    swal({
      title: "Berhasil Dihapus!",
      text: `Pesanan ${keranjang.product.nama} berhasil dihapus.`,
      icon: "success",
      button: false,
      timer: 1500,
    });
    handleClose();
  });
};


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {keranjang.product.nama}{" "}
          <span style={{ fontWeight: "normal" }}>
            (Rp. {keranjang.product.harga.toLocaleString()})
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ marginBottom: 10 }}>
          <strong>Total Harga :</strong>
          <div>Rp. {totalHarga.toLocaleString()}</div>
        </div>
        <Form>
          <Form.Group>
            <Form.Label>Jumlah :</Form.Label>
            <InputGroup>
              <Button variant="outline-secondary" onClick={kurang}>
                <FaMinus />
              </Button>
              <Form.Control
                type="number"
                min="1"
                value={jumlah}
                onChange={(e) => setJumlah(Number(e.target.value))}
                style={{ textAlign: "center", maxWidth: 60 }}
              />
              <Button variant="outline-secondary" onClick={tambah}>
                <FaPlus />
              </Button>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Keterangan :</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={keterangan}
              onChange={(e) => setKeterangan(e.target.value)}
              placeholder="Contoh: Pedes, Nasi Setengah"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onDelete}>
          <FaTrash /> Hapus Pesanan
        </Button>
        <Button variant="primary" onClick={onSave}>
          Simpan
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalKeranjang;
