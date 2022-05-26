/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect, createContext } from "react";

import { Button, Navbar, Container } from "react-bootstrap";

import { AiOutlineShoppingCart } from "react-icons/ai";
import axios from "axios";
import Home from "./components/home";
import Cart from "./components/cart";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export const ShopeContext = createContext(); // create context

function App() {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [cart, setCart] = useState([]);
  const [cart1, setCart1] = useState([]);
  const [focus, setFocus] = useState("product");

  // create an object to send data other coponent by usecontext
  let contextData = {
    data: data,
    data1: data1,
    cart: cart,
    cart1: cart1,
    setData: setData,
    setData1: setData1,
    setCart: setCart,
    setCart1: setCart1,
    setFocus: setFocus,
  };

  useEffect(() => {
    axios
      .get(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      )
      .then((res) => {
        console.log(res.data);
        // adding two value for cart operation
        const resData = res.data.map((val) => {
          return { ...val, storage: val.quantity, select: 0 };
        });
        // use two useState, data for filter product and data1 is for after removed filter we can all product
        setData(resData);
        setData1(resData);
      });
  }, []);

  return (
    <div class="bg-light">
  {/* =======================================================================================
                      Router start
  ===========================================================================================*/}
      <Router>
        <ShopeContext.Provider value={contextData}>
          <Navbar bg="primary" fixed="top">
            <Container>
              <Navbar.Brand href="#">
                <div className="display-6 text-white">Navbar scroll</div>
              </Navbar.Brand>
              {/*====================Product button start========================*/}
              <Link
                to="/"
                className={`btn btn-primary ms-auto  ${
                  focus == "product" ? "border" : ""
                }`}
                onClick={() => {
                  setFocus("product");
                }}
              >
                Products
              </Link>
              {/*====================Product button end========================*/}
              {/*======================cart button start ============================= */}
                <Link
                  to="/cart"
                  className={`btn btn-primary position-relative ${
                    focus == "cart" ? "border" : ""
                  }`}
                  onClick={() => {
                    setFocus("cart");
                  }}
                >
                  <AiOutlineShoppingCart style={{ fontSize: "30px" }} />
                  <span class="position-absolute top-0 start-50 badge rounded-pill text-primary bg-white">
                    {cart.length > 0 ? <>{cart.length}</> : null}
                  </span>
                </Link>
                {/*======================cart button end ============================= */}
            </Container>
          </Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </ShopeContext.Provider>
      </Router>
  {/*==============================================================================
                          Router end
  =======================================================================================*/}
    </div>
  );
}

export default App;
