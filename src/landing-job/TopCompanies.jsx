import React, { useState, useEffect } from "react";
import { Col, Row, Container, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import FeaturedCompaniesCard from "../Components/marketing/common/cards/FeaturedCompaniesCard";
import { Link } from "react-router-dom";

const getRoleFromSessionStorage = () => {
  return sessionStorage.getItem("role");
};

const TopCompanies = () => {
  // State to store the fetched companies
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to fetch top companies
    const fetchTopCompanies = async () => {
      try {
        const response = await axios.get(
          "https://unleashified-backend.azurewebsites.net/api/v1/top-companies"
        );
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching top companies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopCompanies(); // Call fetchTopCompanies function
  }, []);

  return (
    <section className="py-lg-14 bg-light pt-8 pb-10">
      <Container>
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12} xs={12}>
            <Row className="text-center">
              <Col md={12} className="px-lg-10 mb-8 mt-6">
                <span className="text-uppercase text-primary fw-semi-bold ls-md">
                  Top Companies Hiring
                </span>
                <h2 className="h1 fw-bold mt-3 mb-2">
                  Featured companies actively hiring
                </h2>
                <p className="fs-4 mb-0">
                  Explore exciting career opportunities with these
                  forward-thinking companies.{" "}
                </p>
              </Col>
            </Row>
            <Row className="gy-4">
              {isLoading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                companies.map((company) => (
                  <Col lg={3} md={6} xs={12} key={company._id}>
                    <FeaturedCompaniesCard
                      companyLogo={company.companyLogo}
                      companyName={company.companyName}
                      companyIndustry={company.CompanyIndustry}
                      jobCount={company.jobCount}
                    />
                  </Col>
                ))
              )}
            </Row>
            <Col xs={12} className="mt-8 text-center">
              <Link to="/jobs/company-list">
                <Button variant="outline-primary">View All Companies</Button>
              </Link>
            </Col>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TopCompanies;
