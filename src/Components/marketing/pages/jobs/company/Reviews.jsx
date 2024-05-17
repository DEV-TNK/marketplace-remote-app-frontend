// import node module libraries
import { Link, useLocation } from "react-router-dom";

import { Col, Row, Card, Image, ProgressBar } from "react-bootstrap";

// import bootstrap icons
import { StarFill } from "react-bootstrap-icons";

// import media files
import JobGraphics from "../../../../../assets/images/job/job-graphics.svg";
import CommonHeaderTabs from "./CommonHeaderTabs";

// import data files
import ComapniesListData from "../../../../../data/marketing/jobs/CompaniesListData";
import CompanyReviewsData from "../../../../../data/marketing/jobs/CompanyReviewsData";
import Ratings from "../../../../../Components/marketing/common/ratings/Ratings";

const Reviews = () => {
  const companyName = sessionStorage.getItem("companyName");
  const searchParams = new URLSearchParams(window.location.search);
  const companyId = searchParams.get("id");
  const data = ComapniesListData[0];
  const reviewsData = CompanyReviewsData()
  const categorizedRating = [
    { rating: 4.1, category: "Job Security" },
    { rating: 3.8, category: "Skill Development" },
    { rating: 3.8, category: "Company Culture" },
    { rating: 3.7, category: "Work-Life Balance" },
    { rating: 3.5, category: "Career Growth" },
  ];

  const ratingProgressBar = [
    { rating: 5, totalReviews: "6.6k", progressBarValue: 60 },
    { rating: 4, totalReviews: "2.9k", progressBarValue: 50 },
    { rating: 3, totalReviews: "3k", progressBarValue: 35 },
    { rating: 2, totalReviews: "479", progressBarValue: 22 },
    { rating: 1, totalReviews: "865", progressBarValue: 14 },
  ];

  return (
    <CommonHeaderTabs data={data}>
      <Row>
        <Col md={12} className="mb-">
          <div className="d-md-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-0">
                Company Reviews{" "}
                <span className="text-muted ms-2 fs-5 fw-normal">
                  based on {reviewsData.length} Reviews
                </span>
              </h2>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-8">
        <Col lg={9} md={8} xs={12}>
          {reviewsData.map((item, index) => {
            return (
              <div className="d-flex mb-4" key={index}>
                <Image
                  src={item.avatar}
                  alt=""
                  className="rounded-circle avatar-lg"
                />
                <div className=" ms-3">
                  <div className="fs-6 mb-3 mt-1">
                    <h4 className="mb-1">{item.name}</h4>
                    <span className="text-dark fw-semi-bold">
                      {item.rating}
                    </span>
                    <StarFill size={11} className="text-warning ms-1 mb-1" />
                    <span className="ms-2 text-muted">
                      posted on {item.postedOn}
                    </span>
                  </div>
                  <div>
                    <h5>{item.title}</h5>
                    <p>{item.review}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </Col>
        <Col lg={3} md={4} xs={12}>
          <Card className="bg-light shadow-none mt-4 mt-md-0">
            <Card.Body>
              <div className="mb-3">
                <Image src={JobGraphics} alt="" />
              </div>
              <h3>{companyName ? companyName : "Job Provider"} is HIRING</h3>
              <p>
                We know a thing or two about what a best place to work should
                be. Come join us
              </p>
              <Link
                to={`/jobs/company/jobs/?id=${companyId}`}
                className="btn btn-primary"
              >
                View all openings
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </CommonHeaderTabs>
  );
};

export default Reviews;
