import React, { useEffect, useState } from "react";
import { Card, Col, Row, Tab, Nav, Alert } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiHelpCircle, mdiCurrencyNgn } from "@mdi/js";
import { Link } from "react-router-dom";

import InstructorProfileLayout from "./JobSeekerProfileLayout";
import axios from "axios";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  // Get the day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed, so we add 1
  const year = date.getFullYear();

  // Get the hours, minutes, and seconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Format the date as a string
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

const ContractPage = () => {
  const [workProgress, setWorkProgress] = useState([]);
  const [amountProgress, setAmountProgress] = useState(null);
  const [amountPending, setAmountPending] = useState(null);
  const [pendings, setPending] = useState([]);
  const [availableAmount, setAvailableAmount] = useState(null);
  useEffect(() => {
    const userId = sessionStorage.getItem("UserId");

    const contract = async () => {
      try {
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-contract/${userId}`
        );
        setAmountProgress(response.data.workInProgress.totalAmount);
        setWorkProgress(response.data.workInProgress.jobsWork);
        setAmountPending(response.data.pendingContract.totalAmountPending);
        setPending(response.data.pendingContract.jobsPending);
        setAvailableAmount(response.data.availableAmount);
      } catch (error) {
        console.log(error);
      }
    };
    contract();
  }, []);

  const formatPrice = (currencyName, priceValue) => {
    switch (currencyName) {
      case "naira":
      case "NGN":
        return `₦${priceValue}`;
      case "dollars":
      case "USD":
        return `$${priceValue}`;
      case "euros":
      case "EUR":
        return `€${priceValue}`;
      case "pounds":
      case "GBP":
        return `£${priceValue}`;
      default:
        return `₦${priceValue}`;
    }
  };
  return (
    <InstructorProfileLayout>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Contract Overview</h3>
            <p className="mb-0">
              Manage your Current Contract and its updates here
            </p>
          </div>
        </Card.Header>
        <Row className="mt-0 mt-md-4">
          <Col lg={12} md={12} sm={12}>
            <Row className="mb-6">
              <Col md={12}>
                <Tab.Container defaultActiveKey="tab1">
                  <Card className="bg-transparent shadow-none ">
                    <Card.Header className="border-0 p-0 bg-transparent">
                      <Nav className="nav-lb-tab">
                        <Nav.Item className="flex-lg-grow-1">
                          <Nav.Link eventKey="tab1" className="mb-sm-3 mb-md-0">
                            <Row className="align-items-center d-block">
                              <Col className="d-flex align-items-center">
                                Work in Progress
                                <Icon
                                  path={mdiHelpCircle}
                                  size={0.5}
                                  className="me-2"
                                />
                              </Col>

                              <Col className="d-flex align-items-center">
                                <span>
                                  {amountProgress ? amountProgress : "0.00"}
                                </span>
                              </Col>
                            </Row>
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="flex-lg-grow-1">
                          <Nav.Link eventKey="tab3" className="mb-sm-3 mb-md-0">
                            <Row className="align-items-center d-block">
                              <Col className="d-flex align-items-center">
                                Pending
                                <Icon
                                  path={mdiHelpCircle}
                                  size={0.5}
                                  className="me-2"
                                />
                              </Col>
                              <Col className="d-flex align-items-center">
                                <span>
                                  {amountPending ? amountPending : "0.00"}
                                </span>
                              </Col>
                            </Row>
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="flex-lg-grow-1">
                          <Nav.Link eventKey="tab4" className="mb-sm-3 mb-md-0">
                            <Row className="align-items-center d-block">
                              <Col className="d-flex align-items-center">
                                Available
                                <Icon
                                  path={mdiHelpCircle}
                                  size={0.5}
                                  className="me-2"
                                />
                              </Col>
                              <Col className="d-flex align-items-center">
                                <span>
                                  {availableAmount ? availableAmount : "0.00"}
                                </span>
                              </Col>
                            </Row>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Header>
                    <Card.Body className="p-4">
                      <Tab.Content>
                        <Tab.Pane
                          eventKey="tab1"
                          className="pb-4 p-4 ps-0 pe-0"
                        >
                          <Col>
                            <Alert
                              variant="light-warning"
                              className="bg-light-warning text-dark-warning border-0"
                            >
                              <strong>Note</strong>
                              <p>
                                5% of the total payment for a Job will be
                                deducted upon completion and approval of the
                                side job
                              </p>
                            </Alert>
                          </Col>
                          <h5 className="mb-3">Work in Progress</h5>
                          <p>
                            View all Ongoing job waiting for Job provider
                            approval after completion of Job
                          </p>
                          <div className="job-list">
                            {workProgress.map((workItem) => (
                              <div key={workItem._id} className="mt-5">
                                <div className="job-item border border-primary px-4 py-2 rounded">
                                  <div>
                                    <span className="job-title">
                                      Company Name:{" "}
                                    </span>
                                    <span className="job-description">
                                      {workItem
                                        ? workItem.jobPoster.companyName
                                        : ""}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="job-title">
                                      Job Title:{" "}
                                    </span>
                                    <span className="job-description">
                                      {workItem ? workItem.jobTitle : ""}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="job-title">
                                      Job Salary:{" "}
                                    </span>
                                    <span className="job-description">
                                      {workItem
                                        ? formatPrice(
                                            workItem.currency,
                                            workItem.jobSalary
                                          )
                                        : ""}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="job-title">
                                      Delivery Date:{" "}
                                    </span>
                                    <span className="job-description">
                                      {workItem ? workItem.deliveryDate : ""}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Tab.Pane>

                        <Tab.Pane
                          eventKey="tab3"
                          className="pb-4 p-4 ps-0 pe-0"
                        >
                          <Alert
                            variant="light-warning"
                            className="bg-light-warning text-dark-warning border-0"
                          >
                            <strong>Note</strong>
                            <p>
                              5% of the total payment for a Job will be deducted
                              after the waiting security period for any job done
                            </p>
                          </Alert>
                          <h5 className="mb-3">Pending</h5>
                          <p>
                            View all job which payment have been approved by Job
                            provider and waiting for security check comfirmation
                            to be made available for widthdraw
                          </p>
                          {pendings.map((pending) => (
                            <div key={pending._id} className="mt-5">
                              <div className="job-item border border-primary px-4 py-2 rounded">
                                <div>
                                  <span className="job-title">
                                    Company Name:{" "}
                                  </span>
                                  <span className="job-description">
                                    {pending
                                      ? pending.jobPoster.companyName
                                      : ""}
                                  </span>
                                </div>
                                <div>
                                  <span className="job-title">Job Title: </span>
                                  <span className="job-description">
                                    {pending ? pending.jobTitle : ""}
                                  </span>
                                </div>
                                <div>
                                  <span className="job-title">
                                    Job Salary:{" "}
                                  </span>
                                  <span className="job-description">
                                    {pending
                                      ? formatPrice(
                                          pending.currency,
                                          pending.jobSalary
                                        )
                                      : ""}
                                  </span>
                                </div>
                                <div>
                                  <span className="job-title">
                                    Payment Approved:{" "}
                                  </span>
                                  <span className="job-description">
                                    {pending
                                      ? formatDate(pending.updatedAt)
                                      : ""}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </Tab.Pane>

                        <Tab.Pane
                          eventKey="tab4"
                          className="pb-4 p-4 ps-0 pe-0"
                        >
                          <h5 className="mb-3">Available</h5>
                          <div className="job-list">
                            <Link to="/JobSeekerdashboard/seeker-payouts">
                              <button type="button" className="btn btn-primary">
                                Widthdraw Amount
                              </button>
                            </Link>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Card>
                </Tab.Container>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </InstructorProfileLayout>
  );
};

export default ContractPage;
