import React from "react";
import { Card, Col, Row, Tab, Nav } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiHelpCircle, mdiCurrencyNgn } from "@mdi/js";

import ProviderProfileLayout from "./ProviderProfileLayout";

const ContractPage = () => {
  return (
    <ProviderProfileLayout>
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
                                <Icon
                                  path={mdiCurrencyNgn}
                                  size={1}
                                  className="me-2"
                                />
                                <span>0.00</span>
                              </Col>
                            </Row>
                          </Nav.Link>
                        </Nav.Item>

                        <Nav.Item className="flex-lg-grow-1">
                          <Nav.Link eventKey="tab2" className="mb-sm-3 mb-md-0">
                            <Row className="align-items-center d-block">
                              <Col className="d-flex align-items-center">
                                In Review
                                <Icon
                                  path={mdiHelpCircle}
                                  size={0.5}
                                  className="me-2"
                                />
                              </Col>
                              <Col className="d-flex align-items-center">
                                <Icon
                                  path={mdiCurrencyNgn}
                                  size={1}
                                  className="me-2"
                                />
                                <span>0.00</span>
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
                                <Icon
                                  path={mdiCurrencyNgn}
                                  size={1}
                                  className="me-2"
                                />
                                <span>0.00</span>
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
                                <Icon
                                  path={mdiCurrencyNgn}
                                  size={1}
                                  className="me-2"
                                />
                                <span>0.00</span>
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
                          <h5 className="mb-3">Work in Progress</h5>
                          <div className="job-list">
                            <div className="job-item">
                              <span className="job-title">Job Title 1:</span>
                              <span className="job-description">
                                Develop new feature for company website
                              </span>
                            </div>
                            <div className="job-item">
                              <span className="job-title">Job Title 2:</span>
                              <span className="job-description">
                                Design marketing campaign for product launch
                              </span>
                            </div>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane
                          eventKey="tab2"
                          className="pb-4 p-4 ps-0 pe-0"
                        >
                          <h5 className="mb-3">In Review</h5>
                          <div className="job-list">
                            <div className="job-item">
                              <span className="job-title">Job Title 3:</span>
                              <span className="job-description">
                                Evaluate project proposals from vendors
                              </span>
                            </div>
                            <div className="job-item">
                              <span className="job-title">Job Title 4:</span>
                              <span className="job-description">
                                Review resumes for potential candidates
                              </span>
                            </div>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane
                          eventKey="tab3"
                          className="pb-4 p-4 ps-0 pe-0"
                        >
                          <h5 className="mb-3">Pending</h5>
                          <div className="job-list">
                            <div className="job-item">
                              <span className="job-title">Job Title 5:</span>
                              <span className="job-description">
                                Awaiting approval for new project budget
                              </span>
                            </div>
                            <div className="job-item">
                              <span className="job-title">Job Title 6:</span>
                              <span className="job-description">
                                Waiting for feedback on proposed contract terms
                              </span>
                            </div>
                          </div>
                        </Tab.Pane>

                        <Tab.Pane
                          eventKey="tab4"
                          className="pb-4 p-4 ps-0 pe-0"
                        >
                          <h5 className="mb-3">Available</h5>
                          <div className="job-list">
                            <div className="job-item">
                              <span className="job-title">Job Title 7:</span>
                              <span className="job-description">
                                Open position for software developer
                              </span>
                            </div>
                            <div className="job-item">
                              <span className="job-title">Job Title 8:</span>
                              <span className="job-description">
                                Hiring sales representative for new territory
                              </span>
                            </div>
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
    </ProviderProfileLayout>
  );
};

export default ContractPage;
