import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ListCategories from "../components/ListCategories";
import Hasil from "../components/Hasil";
import ModalKeranjang from "../components/ModalKeranjang";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Menus from "../components/Menus";
import swal from "sweetalert";
import TotalBayar from "../components/TotalBayar"; // Pastikan sudah di-import

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [categoriYangDipilih, setCategoriYangDipilih] = useState("Cemilan");
  const [keranjangs, setKeranjangs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [keranjangEdit, setKeranjangEdit] = useState(null);

  useEffect(() => {
    loadMenus(categoriYangDipilih);
    loadKeranjangs();
  }, [categoriYangDipilih]);

  const loadMenus = (kategori) => {
    axios
      .get(API_URL + `products?category.nama=${kategori}`)
      .then((res) => {
        setMenus(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const loadKeranjangs = () => {
    axios
      .get(API_URL + "keranjangs")
      .then((res) => setKeranjangs(res.data))
      .catch((err) => console.error(err));
  };

  const changeCategory = (value) => {
    setCategoriYangDipilih(value);
    setMenus([]);
    loadMenus(value);
  };

  const masukKeranjang = (value) => {
    axios.get(API_URL + `keranjangs?productId=${value.id}`).then((res) => {
      if (res.data.length === 0) {
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
          productId: value.id,
        };

        axios.post(API_URL + "keranjangs", keranjang).then(() => {
          loadKeranjangs();
          swal({
            title: "Berhasil Masuk Keranjang!",
            text: `Berhasil Masuk Keranjang ${keranjang.product.nama}`,
            icon: "success",
            button: false,
            timer: 1500,
          });
        });
      } else {
        const keranjangLama = res.data[0];
        const keranjang = {
          jumlah: keranjangLama.jumlah + 1,
          total_harga: keranjangLama.total_harga + value.harga,
          product: value,
          productId: value.id,
        };

        axios
          .put(API_URL + `keranjangs/${keranjangLama.id}`, keranjang)
          .then(() => {
            loadKeranjangs();
            swal({
              title: "Berhasil Masuk Keranjang!",
              text: `Berhasil Masuk Keranjang ${keranjang.product.nama}`,
              icon: "success",
              button: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const handleSave = (data) => {
    axios.put(API_URL + "keranjangs/" + data.id, data).then(() => {
      setShowModal(false);
      setKeranjangEdit(null);
      loadKeranjangs();
    });
  };

  const handleDelete = (id) => {
    return axios.delete(API_URL + "keranjangs/" + id).then(() => {
      loadKeranjangs();
    });
  };

  return (
    <div className="mt-3">
      <Container fluid>
        <Row>
          <ListCategories
            changeCategory={changeCategory}
            categoriYangDipilih={categoriYangDipilih}
          />
          <Col>
            <h4>
              <strong>Daftar Produk</strong>
            </h4>
            <hr />
            <Row>
              {menus &&
                menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={masukKeranjang}
                  />
                ))}
            </Row>
          </Col>
          <Hasil keranjangs={keranjangs} loadKeranjangs={loadKeranjangs} />
        </Row>
      </Container>

      {/* Tambahkan di sini */}
      <TotalBayar keranjangs={keranjangs} />

      {/* Modal Keranjang */}
      <ModalKeranjang
        show={showModal}
        handleClose={() => setShowModal(false)}
        keranjang={keranjangEdit}
        handleSave={handleSave}
        handleDelete={handleDelete}
        loadKeranjangs={loadKeranjangs}
      />
    </div>
  );
};

export default Home;
