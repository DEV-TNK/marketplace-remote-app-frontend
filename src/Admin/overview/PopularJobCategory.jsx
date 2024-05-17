import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Row, Card, ListGroup, Image, Dropdown } from "react-bootstrap";

const PopularJobCategory = ({ title }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPopularJobCategories();
  }, []);

  const fetchPopularJobCategories = async () => {
    try {
      const response = await axios.get(
        "https://unleashified-backend.azurewebsites.net/api/v1/admin-overview-most-popular"
      );
      setCategories(response.data.providers);
    } catch (error) {
      console.error("Error fetching popular job categories:", error);
    }
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </div>
  ));

  return (
    <Card className="h-100">
      <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
        <h4 className="mb-0">{title}</h4>
        {/* <Link to="#" className="btn btn-outline-secondary btn-sm">
                    View all
                </Link> */}
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          {categories.map((category, index) => (
            <ListGroup.Item
              className={`px-0 ${index === 0 ? "pt-0" : ""}`}
              key={category.providerId}
            >
              <Row>
                <Col xs="auto">
                  <Image
                    src={category.companyLogo}
                    alt=""
                    className="rounded-circle"
                    style={{ width: "90px", height: "65px" }}
                  />
                </Col>
                <Col className="ms-n3">
                  <h4 className="mb-0 h5">{category.companyName}</h4>
                  <span className="me-2 fs-6">
                    <span className="text-dark  me-1 fw-semi-bold">
                      {category.totalJobs} Jobs
                    </span>
                  </span>
                </Col>
                {/* <Col xs="auto">
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle}>
                                            <i className="fe fe-more-vertical text-muted"></i>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu align="end">
                                            <Dropdown.Header>SETTINGS</Dropdown.Header>
                                            <Dropdown.Item eventKey="1">
                                                <i className="fe fe-edit dropdown-item-icon"></i> Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="2">
                                                <i className="fe fe-trash dropdown-item-icon"></i> Remove
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col> */}
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default PopularJobCategory;
