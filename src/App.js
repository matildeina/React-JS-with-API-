import React, { Component } from 'react'
import { Row, Col, Container } from "react-bootstrap";
import ListCategories from "./components/ListCategories";
import Hasil from "./components/Hasil";
import NavbarComponent from "./components/NavbarComponent";
import { API_URL } from './utils/constants'
import axios from 'axios';


export default class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       menus: [],
    }
  }
  
  componentDidMount(){
    axios
    .get(API_URL+ `products`)
    .then(res => {
      const menus  = res.data;
      this.setState({ menus });
    })
    .catch(error => {
      console.error(error);
    }
    )
  }
  render() {
    console.log(this.state.menus);
    return (
      <div>
        <div className="App">
      <NavbarComponent />
      <div className="mt-5">
        <Container fluid>
          <Row>
            <ListCategories />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
            </Col>
            <Hasil />
          </Row>
        </Container>
      </div>
    </div>
      </div>
    )
  }
}



