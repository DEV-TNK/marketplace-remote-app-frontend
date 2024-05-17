import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Col, Row, Container, Image, ListGroup } from "react-bootstrap";
import CompanyBG from "../../../../../assets/images/background/company-bg.jpg";
import axios from "axios";
import CompanyReviewsData from "../../../../../data/marketing/jobs/CompanyReviewsData";

const CommonHeaderTabs = (props) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const _id = searchParams.get("id");
  const reviewData = CompanyReviewsData()

  const [companyData, setCompanyData] = useState([]);
  const [jobCount, setJobCount] = useState(0);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        if (_id) {
          const response = await axios.get(
            `https://unleashified-backend.azurewebsites.net/api/v1/company-single/${_id}`
          );
          setCompanyData(response.data.company);
          sessionStorage.setItem(
            "companyName",
            response.data.company.CompanyName
          );
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    const fetchJobCount = async () => {
      try {
        const jobResponse = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/companySingle-all-jobs/${_id}`
        );
        setJobCount(jobResponse.data.jobs.length);
      } catch (error) {
        console.error("Error fetching job count:", error);
      }
    };

    fetchCompanyData();
    fetchJobCount();
  }, [_id]);

  const tabItems = [
    {
      title: "About Us",
      link: `/jobs/company/about/${_id ? `?id=${_id}` : ""}`,
    },
    {
      title: `Review (${reviewData ? reviewData.length : 0})`,
      link: `/jobs/company/reviews/${_id ? `?id=${_id}` : ""}`,
    },
    {
      title: `Jobs (${jobCount})`,
      link: `/jobs/company/jobs/${_id ? `?id=${_id}` : ""}`,
    },
  ];

  // Render nothing if companyData is not available yet
  if (!companyData) {
    return null;
  }

  return (
    <>
      <section
        className="py-20 bg-white"
        style={{
          backgroundImage: `url(${CompanyBG})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></section>
      <section className="bg-white">
        <Container>
          <Row className="align-items-center">
            <Col xs={12}>
              <div className="d-md-flex align-items-center">
                <div className="position-relative mt-n5">
                  <Image
                    src={companyData.companyLogo}
                    alt="logo"
                    className=" rounded-3 border"
                    style={{ width: "120px" }}
                  />
                </div>
                <div className="w-100 ms-md-4 mt-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <h1 className="mb-0 ">{companyData.CompanyName}</h1>
                      {/* <div>
                        <span className="text-dark fw-medium">
                          {companyData.rating}{' '}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="currentColor"
                            className="bi bi-star-fill text-warning align-baseline"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                          </svg>
                        </span>{' '}
                        <span className="ms-0">
                          ({companyData.totalReviews} Reviews)
                        </span>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-6 bg-white">
        <Container>
          <Row>
            <Col md={12}>
              <div>
                <ListGroup as="ul" bsPrefix="nav nav-line-bottom">
                  {tabItems.map((item, index) => (
                    <ListGroup.Item key={index} as="li" bsPrefix="nav-item">
                      <Link
                        to={item.link}
                        className={`nav-link ${
                          location.pathname === item.link ? "active" : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            </Col>
          </Row>
          <Row className="mt-6">
            <Col xs={12}>{props.children}</Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default CommonHeaderTabs;
