import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Card, Tab, Breadcrumb, Spinner } from "react-bootstrap";
import GridListViewButton from "../../Components/elements/miscellaneous/GridListViewButton";

const JobProvider = () => {
  const [jobProviders, setJobProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobProviders = async () => {
      try {
        const response = await fetch(
          "https://unleashified-backend.azurewebsites.net/api/v1/get-job-posters"
        );
        if (response.ok) {
          const data = await response.json();
          setJobProviders(data);
        } else {
          console.error("Failed to fetch job providers");
        }
      } catch (error) {
        console.error("Error fetching job providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobProviders();
  }, []);

  return (
    <Fragment>
      <Tab.Container defaultActiveKey="grid">
        <Row>
          <Col lg={12} md={12} sm={12}>
            <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">
                  Job Providers{" "}
                  <span className="fs-5 text-muted">
                    ({jobProviders.length})
                  </span>
                </h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                  <Breadcrumb.Item active>Job Providers</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <GridListViewButton keyGrid="grid" keyList="list" />
              </div>
            </div>
          </Col>
        </Row>

        <Tab.Content>
          <Tab.Pane eventKey="grid" className="pb-4">
            {loading ? ( // Display spinner only when loading is true
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <div className="row">
                {jobProviders.map((jobProvider) => (
                  <div key={jobProvider._id} className="col-lg-4 col-md-6 mb-4">
                    <Card>
                      <Card.Img variant="top" src={jobProvider.companyLogo} />
                      <Card.Body>
                        <Card.Title>{jobProvider.companyName}</Card.Title>
                        <Card.Text>{jobProvider.companyLocation}</Card.Text>
                        <Card.Text>
                          Industry: {jobProvider.CompanyIndustry}
                        </Card.Text>
                        <Card.Text>
                          Sector: {jobProvider.companyDesignation}
                        </Card.Text>
                        <Card.Text>Type: {jobProvider.companyType}</Card.Text>

                        <Card.Text>
                          Contacts:{" "}
                          <span>
                            {jobProvider.companyEmail} <br />{" "}
                            <span>{jobProvider.companyContact}</span>
                          </span>
                        </Card.Text>

                        <Card.Text>
                          Total Jobs: {jobProvider.totalJobs}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </Tab.Pane>
          {/* Add List View if needed */}
        </Tab.Content>
      </Tab.Container>
    </Fragment>
  );
};

export default JobProvider;
