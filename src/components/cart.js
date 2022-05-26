/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useMemo, useContext } from "react";

import {
  DropdownButton,
  Dropdown,
  Button,
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";

import {
  BrowserRouter as Router, Routes, Route, Link,
  useNavigate,
} from 'react-router-dom';

import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiRupee } from "react-icons/bi";
import axios from "axios";
import { ShopeContext } from "../App";

function Cart() {
  const [data_l, setData_l] = useState([]);
  const [check, setCheck] = useState([]);
  const [color, setColor] = useState([]);
  const [gender, setGender] = useState([]);
  const [type, setType] = useState([]);
  const [price, setPrice] = useState([]);
  const [input, setInput] = useState("");
  const [container, setContainer] = useState([]);

  let all_data = price;
  let filter_data = check;

  const navigate = useNavigate();

  const {data, data1, cart, cart1, setData, setData1, setCart, setCart1, setFocus} = useContext(ShopeContext)

  useEffect(()=>{
    if (cart.length == 0 ) {
    
      
      navigate("/")
      setFocus("product")
    }
  })
  

  const total = () => {
    let sum = 0
    cart1.map((val) => {
      sum += (val.select * val.price)
    })
    return sum
  }

  const deleteiteam = (option,id) => {
    if(option == "delete"){
    const cart2 = cart.filter((val)=>{
      return val.id != id 
    })
    const cart3 = data1.filter((val)=>{
        if(val.id == id){
          val.quantity = val.storage;
          val.select = 0;
          return val;
        } else {
          return val;
        }
    })
    setData1(cart3)
    setCart(cart2)
    } else {
      const cart2 = cart.filter((val)=>{
        return val.id != id 
      })
      const cart3 = data1.filter((val)=>{
        if(val.id == id){
          val.quantity = val.storage;
          val.select = 0;
          return val;
        } else {
          return val;
        }
    })
      console.log("cart2", cart2)
      const array = []
      const cart4 =cart3.map((val) => {
        if(val.id == id){
          for(let i = 0; i<=option; i++){
            console.log("i", i)
            console.log("option", option)
            val.quantity = val.quantity - 1;
            val.select = val.storage - val.quantity;
            cart2.push(val)
            
          }
          array.push(val)
        } else {
          array.push(val)
        }
      })
      console.log("cart222", cart2)

      setCart(cart2)
      setData1(array)
      
    }
  }



  console.log("cart1", cart1);







  return (
    <div class="bg-light pt-5 mt-5">
      <Container fluid="md">
        <Row>
          {cart1.map((val) => {
            return (
              <Col lg={12} className="mb-5 px-3">
                <div class="card shadow p-2">
                  <Row>
                    <Col sm={5} lg={4}>
                      <img
                        src={val.imageURL}
                        alt="Card image in the top"
                        class="card-img-top border"
                      ></img>
                    </Col>
                    <Col sm={6} lg={8}>
                      <div class="card-body">
                        <p class="display-6">{val.name}</p>
                        <h4 class="card-title">
                          <BiRupee /> {val.price}
                        </h4>
                        {val.quantity > 0 ? (
                          <p class="text-success">in stock</p>
                        ) : (
                          <p class="text-danger">out of stock</p>
                        )}
                        <p class="card-title">type : {val.type}</p>
                        <select
                          class="form-select w-25"
                          aria-label="Default select example"
                          onChange={(e)=> {deleteiteam(e.target.value, val.id)}}
                        >
                          <option value="delete">delete</option>
                          {
                              new Array(val.storage).fill(0).map((l, ll) => {
                                if(ll+1 == val.select){
                                  return <option value={ll} selected> {ll+1} </option>
                                } else {
                                 return <option value={ll}> {ll+1} </option>
                                }
                              })
                          }
                        </select>
                        <Button variant="outline-danger w-50 my-3 mx-auto" onClick={()=> {deleteiteam("delete", val.id)}} >Delete</Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
      { cart1.length > 0 ? <div class="fixed-bottom text-end h5 bg-light" style={{height:"50px", marginBottom:"0px"}} >
        <Container>
        <span class="display-6" style={{fontSize:"30px"}}>Total  </span><span>Rs {
          total()
          }</span>
        </Container>
      </div> : <></>}
    </div>
  );
}

export default Cart;
