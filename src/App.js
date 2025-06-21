import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";

const App = () => (
  <BrowserRouter>
    <NavbarComponent />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sukses" element={<Sukses />} />
    </Routes>
  </BrowserRouter>
);

export default App;
