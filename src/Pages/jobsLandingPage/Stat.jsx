// import node module libraries
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

// import sub components
import SectionHeading from "../about/SectionHeading";

import applyImg from "../../Pages/servicesLandingPage/images/office-620817_640.jpg"

const Stat = () => {
  const title = "How It Works";
  const description =(
    <div className="h3">
      <p>Innovating the future of employment by connecting job seekers with opportunities that match their skills and aspirations, Unleashified empowers individuals to thrive in their careers while supporting businesses in finding the right talent to succeed.</p>
      <ol>
        <li><strong>Create a Profile:</strong> Sign up and create a professional profile that showcases your skills, experience, and achievements.</li>
        <li><strong>Search for Jobs:</strong> Browse our extensive job listings using filters to find the perfect match for your qualifications and interests.</li>
        <li><strong>Apply:</strong> Submit your application directly through our platform with just a few clicks. Track your application status in real-time.</li>
        <li><strong>Get Hired:</strong> Connect with employers, attend interviews, and land your dream job. Our support team is here to help you every step of the way.</li>
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
          <img src={applyImg} alt="How It Works" style={{width:"auto", height:"auto", borderRadius:10}} />
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
