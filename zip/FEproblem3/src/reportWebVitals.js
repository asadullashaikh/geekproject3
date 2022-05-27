const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;

    {/*<div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">
            <div className="display-6">Navbar scroll</div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Button className="btn btn-secondary">
            <AiOutlineShoppingCart style={{ fontSize: "30px" }} />
          </Button>
        </Container>
      </Navbar>
      <Container className="my-5">
        <Form className="d-flex justify-content-center">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2 w-50"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
      <Container className="my-5">
        <Container fluid="md">
          <Row>
            <Col lg={3}>
              <Row className="card p-3 shadow mx-5">
                <Col lg={12}>
                  <fieldset>
                    <legend>Colors</legend>
                    <Form
                      onChange={(e) => {
                        select(e);
                      }}
                    >
                    {
                      color.map((val, index) => {
                        return (
                          <Form.Check
                        block
                        value= {`${val}`}
                        label= {`${val}`}
                        name="color"
                        type={"checkbox"}
                        id={`${val}-${index}`}
                      />
                        )
                      })
                    }
                    </Form>
                  </fieldset>
                </Col>
                <Col lg={12}>
                <fieldset>
                    <legend>Gender</legend>
                    <Form
                      onChange={(e) => {
                        select(e);
                      }}
                    >
                    {
                      gender.map((val, index) => {
                        return (
                          <Form.Check
                        block
                        value= {`${val}`}
                        label= {`${val}`}
                        name="gender"
                        type={"checkbox"}
                        id={`${index}`}
                      />
                        )
                      })
                    }
                    </Form>
                  </fieldset>
                </Col>
                <Col lg={12}>1</Col>
                <Col lg={12}>1</Col>
              </Row>
            </Col>
            <Col lg={9}>
              <Row>
                
                  {data.map((val) => {
                    return(
                      <Col lg={4} className="mb-5 px-3">
                    <div class="card shadow p-2">
                      <img
                        src={val.imageURL}
                        alt="Card image in the top"
                        class="card-img-top border"
                      ></img>
                      <div class="card-body d-flex justify-content-between">
                        <h4 class="card-title">RS {val.price}</h4>
                        <button class="btn btn-secondary"> Add to Cart</button>
                      </div>
                    </div>
                    </Col>
                    );
                  })}
                
                <Col lg={4} className="mb-5 px-3">
                  <div class="card shadow">
                    <div class="card-body">
                      <h4 class="card-title">Card title</h4>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In laoreet pellentesque lorem sed elementum. Suspendisse
                        maximus convallis ex. Etiam eleifend velit leo.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={4} className="mb-5 px-3">
                  <div class="card shadow">
                    <div class="card-body">
                      <h4 class="card-title">Card title</h4>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In laoreet pellentesque lorem sed elementum. Suspendisse
                        maximus convallis ex. Etiam eleifend velit leo.
                      </p>
                    </div>
                  </div>
                </Col>
                <Col lg={4} className="mb-5 px-3">
                  <div class="card shadow">
                    <div class="card-body">
                      <h4 class="card-title">Card title</h4>
                      <p class="card-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        In laoreet pellentesque lorem sed elementum. Suspendisse
                        maximus convallis ex. Etiam eleifend velit leo.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>*/}