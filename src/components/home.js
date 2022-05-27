/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from "react";

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

import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { ShopeContext } from "../App";

function Home() {
  const [data_l, setData_l] = useState([]);
  const [check, setCheck] = useState([]);
  const [color, setColor] = useState([]);
  const [gender, setGender] = useState([]);
  const [type, setType] = useState([]);
  const [colordata, setColordata] = useState([]);
  const [genderdata, setGenderdata] = useState([]);
  const [typedata, setTypedata] = useState([]);
  const [price, setPrice] = useState([]);
  const [input, setInput] = useState("");

  // used following varible
  // setState is working async so the we can access previous value instead of present value
  // to solve that issue we re using followng variable
  let all_data = price;
  let filter_data = check;
  let filter_colordata = colordata;
  let filter_genderdata = genderdata;
  let filter_typedata = typedata;

  console.log("usecontext", useContext(ShopeContext));
  const { data, data1, cart, setData, setData1, setCart, setCart1, setFocus } =
    useContext(ShopeContext);

  // useEffect used for make cart unique
  useEffect(() => {
    const array = [];
    const unique = cart.filter((ele) => {
      if (!array.includes(ele)) {
        array.push(ele);
        return true;
      }
    });
    setCart1(unique.sort());
  }, [cart]);

  const checkdata = data.map((val) => {
    Object.keys(val).map((ele) => {
      if (!color.includes(val[ele]) && ele == "color") {
        setColor([...color, val[ele]]);
      }
      if (!gender.includes(val[ele]) && ele == "gender") {
        setGender([...gender, val[ele]]);
      }
      if (!type.includes(val[ele]) && ele == "type") {
        setType([...type, val[ele]]);
      }
    });
    setFocus("product");
  });

  const select = (e) => {
    if (e.target.checked) {
      if (e.target.value == "min") {
        // checkbox for price 0-250
        setPrice([...price, { min: 0, max: 250 }]);
        all_data = [...price, { min: 0, max: 250 }];
        filterCheck();
      } else if (e.target.value == "mid") {
        // checkbox for price 251-450
        setPrice([...price, { min: 251, max: 450 }]);
        all_data = [...price, { min: 251, max: 450 }];
        filterCheck();
      } else if (e.target.value == "max") {
        // checkbox for price 451-500
        setPrice([...price, { min: 451, max: 500 }]);
        all_data = [...price, { min: 451, max: 500 }];
        filterCheck();
      } else if (e.target.name == "color") {
        // checkbox for color
        filter_colordata = [...colordata, e.target.value];
        setColordata([...colordata, e.target.value]);
        filterCheck();
      } else if (e.target.name == "gender") {
        filter_genderdata = [...genderdata, e.target.value];
        setGenderdata([...genderdata, e.target.value]);
        filterCheck();
        console.log("e.target.value", e.target.value);
      } else if (e.target.name == "type") {
        filter_typedata = [...typedata, e.target.value];
        console.log("filter_typedata", filter_typedata);
        setTypedata([...typedata, e.target.value]);
        filterCheck();
      }
    } else {
      if (e.target.name == "color") {
        const new1 = colordata.filter((val) => {
          return val != e.target.value;
        });
        filter_colordata = new1;
        console.log("====================");
        console.log("new1", new1);
        setColordata(new1);
        filterCheck();
      } else if (e.target.name == "gender") {
        const new1 = genderdata.filter((val) => {
          return val != e.target.value;
        });
        filter_genderdata = new1;
        setGenderdata(new1);
        filterCheck();
        console.log("e.target.value", e.target.value);
      } else if (e.target.name == "type") {
        const new1 = typedata.filter((val) => {
          return val != e.target.value;
        });
        filter_typedata = new1;
        setTypedata(new1);
        filterCheck();
      } else if (e.target.name == "Price") {
        const newprice = price.filter((val) => {
          if (e.target.value == "min") {
            return val.min != 0;
          } else if (e.target.value == "mid") {
            return val.min != 251;
          } else if (e.target.value == "max") {
            return val.min != 451;
          }
        });
        all_data = newprice;
        setPrice(newprice);
        filterCheck();
        console.log("price", all_data);
      }
    }
  };

  const filterCheck = () => {
    console.log("input", input);
    if (input.length > 0) {
      fiterData(data_l);
    } else {
      fiterData(data1);
    }
  };

  // filter data according checkbox selected element

  const fiterData = (inputData) => {
    if (
      filter_colordata.length == 0 &&
      filter_genderdata == 0 &&
      filter_typedata.length == 0 &&
      all_data.length == 0
    ) {
      setData(inputData);
    } else {
      if (                                    //-------filter 1
        filter_colordata.length > 0 &&
        filter_genderdata.length == 0 &&
        filter_typedata.length == 0 &&
        all_data.length == 0
      ) {
        const ckeck_box_data = inputData.filter((item) => { // filter data acccording to colordata
          return Object.keys(item).some((key) => {
            return filter_colordata.includes(item[key]);
          });
        });
        setData(ckeck_box_data);
      } else if (                        // ------------filter 2
        filter_genderdata.length > 0 &&
        filter_typedata.length == 0 &&
        all_data.length == 0
      ) {
        let ckeck_box_data = inputData.filter((item) => {
          return Object.keys(item).some((key) => {
            return filter_genderdata.includes(item[key]);
          });
        });

        if (filter_colordata.length > 0) {        // filter data acccording to colordata
          ckeck_box_data = ckeck_box_data.filter((item) => {
            return Object.keys(item).some((key) => {
              return filter_colordata.includes(item[key]);
            });
          });
        }
        setData(ckeck_box_data);
      } else if (filter_typedata.length > 0 && all_data.length == 0) {   // ------------filter 3
        let ckeck_box_data = inputData.filter((item) => {          // filter data acccording to typedata
          return Object.keys(item).some((key) => {
            return filter_typedata.includes(item[key]);
          });
        });

        if (filter_colordata.length > 0 && filter_genderdata.length == 0) {          // filter data acccording to colordata
          ckeck_box_data = ckeck_box_data.filter((item) => {
            return Object.keys(item).some((key) => {
              return filter_colordata.includes(item[key]);
            });
          });
        } else if (filter_genderdata.length > 0) {
          ckeck_box_data = ckeck_box_data.filter((item) => {
            return Object.keys(item).some((key) => {
              return filter_genderdata.includes(item[key]);
            });
          });

          if (filter_colordata.length > 0) {          // filter data acccording to colordata
            ckeck_box_data = ckeck_box_data.filter((item) => {
              return Object.keys(item).some((key) => {
                return filter_colordata.includes(item[key]);
              });
            });
          }
        }
        setData(ckeck_box_data);
      } else if (all_data.length > 0) {          // ---------filter 4
        let ckeck_box_data = inputData.filter((item) => {
          return Object.keys(item).some((key) => {
            return all_data.some((ele) => {
              return ele["max"] >= item["price"] && ele["min"] <= item["price"];
            });
          });
        });

        if (
          filter_colordata.length > 0 &&
          filter_genderdata.length == 0 &&
          filter_typedata.length == 0
        ) {
          ckeck_box_data = ckeck_box_data.filter((item) => {      // filter data acccording to colordata
            return Object.keys(item).some((key) => {
              return filter_colordata.includes(item[key]);
            });
          });
        } else if (
          filter_genderdata.length > 0 &&
          filter_typedata.length == 0
        ) {
          ckeck_box_data = ckeck_box_data.filter((item) => {
            return Object.keys(item).some((key) => {
              return filter_genderdata.includes(item[key]);
            });
          });

          if (filter_colordata.length > 0) {           // filter data acccording to colordata
            ckeck_box_data = ckeck_box_data.filter((item) => {
              return Object.keys(item).some((key) => {
                return filter_colordata.includes(item[key]);
              });
            });
          }
        } else if (filter_typedata.length > 0) {       // filter data acccording to typedata
          ckeck_box_data = ckeck_box_data.filter((item) => {
            return Object.keys(item).some((key) => {
              return filter_typedata.includes(item[key]);
            });
          });

          if (filter_colordata.length > 0 && filter_genderdata.length == 0) {
            ckeck_box_data = ckeck_box_data.filter((item) => {
              return Object.keys(item).some((key) => {
                return filter_colordata.includes(item[key]);
              });
            });
          } else if (filter_genderdata.length > 0) {
            ckeck_box_data = ckeck_box_data.filter((item) => {
              return Object.keys(item).some((key) => {
                return filter_genderdata.includes(item[key]);
              });
            });

            if (filter_colordata.length > 0) {          // filter data acccording to colordata
              ckeck_box_data = ckeck_box_data.filter((item) => {
                return Object.keys(item).some((key) => {
                  return filter_colordata.includes(item[key]);
                });
              });
            }
          }
        }

        setData(ckeck_box_data);
      }
    }
  };

  const search = (e) => {
    e.preventDefault();

    const lowercaseValue = e.target.search.value;
    if (!lowercaseValue) {
      setData(data1);
    } else {
      const filteredData = data1.filter((item) =>
        Object.keys(item).some((key) =>
          item[key].toString().toLowerCase().includes(lowercaseValue)
        )
      );

      setData(filteredData);
      setData_l(filteredData);
    }
  };


  // add data in cart
  const cart_all = (id, l) => {
    if (l == "add_product") {
      data.forEach((l) => {
        if (l.id == id) {
          setCart([...cart, l]);
        }
      });

      const cartData = data1.map((val) => {
        if (id == val.id) {
          val.quantity = val.quantity - 1;
          val.select = val.storage - val.quantity;
          return val;
        } else {
          return val;
        }
      });

      setData1(cartData);
    } else {
      const cartData = data.map((val) => {
        if (id == val.id) {
          val.quantity = val.quantity - 1;
          return val;
        } else {
          return val;
        }
      });
    }
  };

  return (
    <div class="position-relative mt-5 pt-5">
      {/* ======================================Container search start ============================== */}

      <Container className="my-5">
        <Form
          className="d-flex justify-content-center"
          onSubmit={(e) => {
            search(e);
          }}
        >
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2 w-50"
            aria-label="Search"
            name="search"
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
          <button
            class="btn btn-primary  px-3 mx-2 d-none d-sm-block d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            <FiFilter />
          </button>

          <button
            class="btn btn-primary fixed-bottom ms-auto me-5 mb-5 d-block d-sm-none"
            style={{ width: "40px" }}
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasTop"
            aria-controls="offcanvasTop"
          >
            <FiFilter />
          </button>

          <div
            class="offcanvas offcanvas-top h-100"
            tabindex="-1"
            id="offcanvasTop"
            aria-labelledby="offcanvasTopLabel"
          >
            <div class="offcanvas-header">
              <h5 id="offcanvasTopLabel">Offcanvas top</h5>
              <button
                type="button"
                class="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div class="offcanvas-body">
              <Row className="bg-white p-2 mb-5">
                <Col sm={12}>
                  <legend>Colors</legend>
                  <Form
                    onChange={(e) => {
                      select(e);
                    }}
                  >
                    {color.map((val, index) => {
                      return (
                        <Form.Check
                          block
                          value={`${val}`}
                          label={`${val}`}
                          name="color"
                          type={"checkbox"}
                          id={`${val}-${index}`}
                        />
                      );
                    })}
                  </Form>
                </Col>
                <Col sm={12}>
                  <fieldset>
                    <legend>Gender</legend>
                    <Form
                      onChange={(e) => {
                        select(e);
                      }}
                    >
                      {gender.map((val, index) => {
                        return (
                          <Form.Check
                            block
                            value={`${val}`}
                            label={`${val}`}
                            name="gender"
                            type={"checkbox"}
                            id={`${val}-${index}`}
                          />
                        );
                      })}
                    </Form>
                  </fieldset>
                </Col>
                <Col sm={12}>
                  <fieldset>
                    <legend>Types</legend>
                    <Form
                      onChange={(e) => {
                        select(e);
                      }}
                    >
                      {type.map((val, index) => {
                        return (
                          <Form.Check
                            block
                            value={`${val}`}
                            label={`${val}`}
                            name="color"
                            type={"checkbox"}
                            id={`${val}-${index}`}
                          />
                        );
                      })}
                    </Form>
                  </fieldset>
                </Col>
                <Col sm={12}>
                  <fieldset>
                    <legend>Price</legend>
                    <Form
                      onChange={(e) => {
                        select(e);
                      }}
                    >
                      <Form.Check
                        block
                        value="min"
                        label="0 - 250"
                        name="Price"
                        type={"checkbox"}
                        id={`price-1`}
                      />
                      <Form.Check
                        block
                        value="mid"
                        label="251 - 450"
                        name="Price"
                        type={"checkbox"}
                        id={`price-2`}
                      />
                      <Form.Check
                        block
                        value="max"
                        label="451 - 500"
                        name="Price"
                        type={"checkbox"}
                        id={`price-3`}
                      />
                    </Form>
                  </fieldset>
                </Col>
              </Row>
              <div class="fixed-bottom">
                <button
                  type="button"
                  class="btn btn-primary w-100"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Container>

      {/* ======================================Container search end ============================== */}

      {/* ======================================Container start =================================== */}
      <div class="container">
        {/* ------------------------- row1 start--------------------- */}
        <Row>
          {/* ------------------------- col1 filter start--------------------- */}
          <Col xl={2} className="d-none d-lg-block">
            {" "}
            {/* this col will hide at below lg ( large screen ) */}
            {/* ------------------------- row1 col1 row 1 start--------------------- */}
            <Row className="bg-white shadow p-2 mb-5">
              {/* ------------------------- row1 col1 row 1 col1 start--------------------- */}
              <Col sm={3} xl={12}>
                <legend>Colors</legend>
                <Form
                  onChange={(e) => {
                    select(e);
                  }}
                >
                  {color.map((val, index) => {
                    return (
                      <Form.Check
                        block
                        value={`${val}`}
                        label={`${val}`}
                        name="color"
                        type={"checkbox"}
                        id={`${val}-${index}`}
                      />
                    );
                  })}
                </Form>
              </Col>
              {/* ------------------------- row1 col1 row 1 col1 end--------------------- */}

              {/* ------------------------- row1 col1 row 1 col2 start--------------------- */}
              <Col sm={3} xl={12}>
                <fieldset>
                  <legend>Gender</legend>
                  <Form
                    onChange={(e) => {
                      select(e);
                    }}
                  >
                    {gender.map((val, index) => {
                      return (
                        <Form.Check
                          block
                          value={`${val}`}
                          label={`${val}`}
                          name="gender"
                          type={"checkbox"}
                          id={`${val}-${index}`}
                        />
                      );
                    })}
                  </Form>
                </fieldset>
              </Col>
              {/* ------------------------- row1 col1 row 1 col2 end--------------------- */}

              {/* ------------------------- row1 col1 row 1 col3 start--------------------- */}
              <Col sm={3} xl={12}>
                <fieldset>
                  <legend>Types</legend>
                  <Form
                    onChange={(e) => {
                      select(e);
                    }}
                  >
                    {type.map((val, index) => {
                      return (
                        <Form.Check
                          block
                          value={`${val}`}
                          label={`${val}`}
                          name="type"
                          type={"checkbox"}
                          id={`${val}-${index}`}
                        />
                      );
                    })}
                  </Form>
                </fieldset>
              </Col>
              {/* ------------------------- row1 col1 row 1 col3 end--------------------- */}

              {/* ------------------------- row1 col1 row 1 col4 start--------------------- */}
              <Col sm={3} xl={12}>
                <fieldset>
                  <legend>Price</legend>
                  <Form
                    onChange={(e) => {
                      select(e);
                    }}
                  >
                    <Form.Check
                      block
                      value="min"
                      label="0 - 250"
                      name="Price"
                      type={"checkbox"}
                      id={`price-1`}
                    />
                    <Form.Check
                      block
                      value="mid"
                      label="251 - 450"
                      name="Price"
                      type={"checkbox"}
                      id={`price-2`}
                    />
                    <Form.Check
                      block
                      value="max"
                      label="451 - 500"
                      name="Price"
                      type={"checkbox"}
                      id={`price-3`}
                    />
                  </Form>
                </fieldset>
              </Col>
              {/* ------------------------- row1 col1 row 1 col4 end--------------------- */}
            </Row>
            {/* ------------------------- row1 col1 row 1 end--------------------- */}
          </Col>
          {/* ------------------------- col1 filter end--------------------- */}

          {/* ------------------------- col2 product start--------------------- */}
          <Col xl={10}>
            <Row>
              {data.map((val) => {
                return (
                  <Col sm={6} lg={4} className="mb-5 px-3">
                    <div class="card card-1 shadow p-2">
                      <img
                        src={val.imageURL}
                        alt="Card image in the top"
                        class="card-img-top border image-size"
                        style={{ height: "300px" }}
                      ></img>
                      <div class="card-body">
                        <div class="d-flex justify-content-between">
                          <h6 class="card-title">{val.name}</h6>
                          <h5 class="card-title">Rs {val.price}</h5>
                        </div>
                        <div class="d-flex justify-content-between">
                          <p>{val.type}</p>
                          <div
                            style={{
                              height: "20px",
                              width: "20px",
                              borderRadius: "50%",
                              backgroundColor: `${val.color.toLowerCase()}`,
                            }}
                          ></div>
                        </div>
                        {val.quantity > 0 ? (
                          <button
                            class="btn btn-outline-primary w-100"
                            onClick={() => {
                              cart_all(val.id, "add_product");
                            }}
                          >
                            {" "}
                            Add to Cart
                          </button>
                        ) : (
                          <button disabled class="btn btn-secondary w-100">
                            {" "}
                            Out of stock
                          </button>
                        )}
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
          {/* ------------------------- col2 product end--------------------- */}
        </Row>
        {/* ------------------------- row1 end--------------------- */}
      </div>
      {/* ======================================Container end =================================== */}
    </div>
  );
}

export default Home;
