import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Details from "./pages/detail/Details";
import Home from "./pages/home";
import Header from "./components/Header";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <div className="w-full max-w-[1750px] m-auto">
        <Header />
        <Modal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
