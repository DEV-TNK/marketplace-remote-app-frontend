// import node module libraries
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

// import sub components
import SectionHeading from "../about/SectionHeading";

import applyImg from "./images/office-620817_640.jpg"

const Stat = () => {
  const title = "How It Works";
  const description =(
    <div className="h3">
      <ol>
        <strong>For Service Seekers:</strong>
        <li><strong>Browse Services:</strong> Search through a wide range of professional services. Use our advanced filters to find exactly what you need.</li>
        <li><strong>Compare and Choose:</strong> Read reviews, compare prices, and check ratings to select the best service provider for your requirements.</li>
        <li><strong>Connect and Hire:</strong> Contact service providers directly through our platform. Discuss details, negotiate terms, and hire with confidence.</li>
      </ol>
      <ol>
        <strong>For Service Providers:</strong>
        <li><strong>Create a Profile:</strong> Sign up and create a comprehensive profile showcasing your skills, experience, and portfolio.</li>
        <li><strong>List Your Services:</strong> Post detailed descriptions of the services you offer. Set your rates and availability to attract potential clients.</li>
        <li><strong>Get Hired:</strong> Receive inquiries and job offers from clients. Manage your engagements and build your reputation through excellent service.</li>
      </ol>
    </div>
  );
  const counters = [
    {
      id: 1,
      title: "Job seekers",
      value: "220k",
    },
    {
      id: 2,
      title: "Job providers",
      value: "150k",
    },
    {
      id: 3,
      title: "Jobs Available",
      value: "10K",
    },
    {
      id: 4,
      title: "Total Transaction",
      value: "2k",
    },
  ];
  return (
    <Fragment>
      <Row className="align-items-center">
        <Col lg={6} md={12}>
        <SectionHeading title={title}/>
        {description}
        </Col>
        <Col lg={6} md={12}>
          <img src={applyImg} alt="How It Works" style={{width:"100%", height:"100%", borderRadius:10}} />
        </Col>
      </Row>
      <Row>
        {counters.map((item, index) => {
          return (
            <Col lg={3} md={6} sm={6} xs={6} key={index}>
              {/* Counter */}
              <div className="border-top pt-4 mt-6 mb-5">
                <h1 className="display-3 fw-bold mb-0">{item.value}</h1>
                <p className="text-uppercase text-muted">{item.title}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default Stat;
