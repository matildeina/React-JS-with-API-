import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Sukses = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-5">
      <img
        src="./assets/images/sukses.png"
        alt="Sukses"
        style={{ width: 300, marginBottom: 30 }}
      />
      <h2 className="mt-3">Sukses Pesan</h2>
      <p>Terimakasih Sudah Memesan!</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Kembali
      </Button>
    </div>
  );
};

export default Sukses;