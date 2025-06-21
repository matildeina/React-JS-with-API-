import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/NavbarComponent";
import Home from "./pages/Home";
import Sukses from "./pages/Sukses";
import Dashboard from "./pages/Dashboard";

const App = () => (
  <BrowserRouter>
    <NavbarComponent />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sukses" element={<Sukses />} />
    </Routes>
  </BrowserRouter>
);

export default App;
