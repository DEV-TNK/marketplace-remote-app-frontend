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
      case "CFA franc":
      case "F CFA":
        return `F CFA${priceValue}`;
      // case "dollars":
      // case "USD":
      //   return `$${priceValue}`;
      // case "euros":
      // case "EUR":
      //   return `€${priceValue}`;
      // case "pounds":
      // case "GBP":
      //   return `£${priceValue}`;
      default:
        return `F CFA${priceValue}`;
    }
  };
  return (
    <InstructorProfileLayout>
      <Card className="border-0">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Vue d’ensemble du contrat </h3>
            <p className="mb-0">
            Gérez votre contrat actuel et ses mises à jour ici
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
                              Travaux en cours 
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
                              En attente
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
                              Disponible
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
                              <strong> Remarque</strong>
                              <p>
                              5% du paiement total d’un travail sera déduit à l’achèvement et à l’approbation du travail secondaire
                              </p>
                            </Alert>
                          </Col>
                          <h5 className="mb-3"> Travail en cours</h5>
                          <p>
                          affichez tous les travaux en cours en attente de l’approbation du fournisseur de travaux une fois le travail terminé
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
                            5 % du montant total du paiement pour un emploi sera déduit après la période de sécurité d'attente pour tout travail effectué.
                            </p>
                          </Alert>
                          <h5 className="mb-3">En attente</h5>
                          <p>
                          Voir tous les emplois dont le paiement a été approuvé par le fournisseur de services et qui attendent la confirmation du contrôle de sécurité pour être disponibles pour le retrait.
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
                          <h5 className="mb-3">Disponible</h5>
                          <div className="job-list">
                            <Link to="/JobSeekerdashboard/seeker-payouts">
                              <button type="button" className="btn btn-primary">
                              Montant à retirer.
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
