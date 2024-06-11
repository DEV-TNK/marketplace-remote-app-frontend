import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Tab, Breadcrumb, Spinner } from "react-bootstrap";
import GridListViewButton from "../../Components/elements/miscellaneous/GridListViewButton";
import ProviderGridCard from '../user/ProviderGridCard';
import ProviderListItems from '../user/ProviderListItems';

const JobProvider = () => {
  const [jobProviders, setJobProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobProviders = async () => {
      try {
        const response = await fetch(
          "https://marketplacebackendas-test.azurewebsites.net/api/v1/get-job-posters"
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
                  <Breadcrumb.Item href="/admin/dashboard/overview">Dashboard</Breadcrumb.Item>
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
            {loading ? ( 
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <ProviderGridCard jobProviders={jobProviders} />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="list" className="pb-4">
            {loading ? ( 
              <div className="d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <ProviderListItems jobProviders={jobProviders} />
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Fragment>
  );
};

export default JobProvider;
