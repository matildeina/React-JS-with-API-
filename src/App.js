import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import ListCategories from "./components/ListCategories";
import Hasil from "./components/Hasil";
import NavbarComponent from "./components/NavbarComponent";
import { API_URL } from "./utils/constants";
import axios from "axios";
import { Menus } from "./components";
import swal from "sweetalert";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      categoriYangDipilih: "Cemilan",
      keranjangs: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + `products?category.nama=` + this.state.categoriYangDipilih)
      .then((res) => {
        // console.log("Response: ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.error(error);
      });
      axios
      .get(API_URL + "keranjangs")
      .then((res) => {
        // console.log("Response: ", res);
        const keranjangs = res.data;
        this.setState({ keranjangs });
      })
      .catch((error) => {
        console.error(error);
      });
  
  
  }

  changeCategory = (value) => {
    this.setState({
      categoriYangDipilih: value,
      menus: [],
    });
    axios
      .get(API_URL + `products?category.nama=` + value)
      .then((res) => {
        // console.log("Response: ", res);
        const menus = res.data;
        this.setState({ menus });
      })
      .catch((error) => {
        console.error(error);
      });

  };

  // ...existing code...
masukKeranjang = (value) => {
  axios
    .get(API_URL + `keranjangs?product.id=${value.id}`)
    .then((res) => {
      if (res.data.length === 0) {
        // Jika belum ada, buat baru
        const keranjang = {
          jumlah: 1,
          total_harga: value.harga,
          product: value,
        };

        axios
          .post(API_URL + `keranjangs`, keranjang)
          .then(() => {
            swal({
              title: "Berhasil Masuk Keranjang!",
              text: "Berhasil Masuk Keranjang " + keranjang.product.nama,
              icon: "success",
              button: false,
            });
          });
      } else {
        // Jika sudah ada, update jumlah dan total_harga
        const keranjangLama = res.data[0];
        const keranjang = {
          jumlah: keranjangLama.jumlah + 1,
          total_harga: keranjangLama.total_harga + value.harga,
          product: value,
        };

        axios
          .put(API_URL + `keranjangs/${keranjangLama.id}`, keranjang)
          .then(() => {
            swal({
              title: "Berhasil Masuk Keranjang!",
              text: "Berhasil Masuk Keranjang " + keranjang.product.nama,
              icon: "success",
              button: false,
            });
          });
      }
    });
}
// ...existing code...



  render() {
    const { menus, categoriYangDipilih, keranjangs } = this.state;
    return (
      <div>
        <div className="App">
          <NavbarComponent />
          <div className="mt-3">
            <Container fluid>
              <Row>
                <ListCategories
                  changeCategory={this.changeCategory}
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
                          masukKeranjang={this.masukKeranjang}
                        />
                      ))}
                  </Row>
                </Col>
                <Hasil keranjangs={keranjangs}/>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}
