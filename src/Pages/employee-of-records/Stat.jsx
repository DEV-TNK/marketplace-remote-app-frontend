// import node module libraries
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

// import sub components
import SectionHeading from "../about/SectionHeading";

import applyImg from "./images/office-620817_640.jpg";

const Stat = () => {
  const title = "How It Works";
  const description = (
    <div className="h3">
      <ol>
        <li>
          <strong>Submit Your Request:</strong> Start by telling us what you
          need. Provide details about the skills, experience, and qualifications
          you're looking for in a candidate.
        </li>
        <li>
          <strong>Candidate Sourcing:</strong> We leverage our extensive network
          and advanced recruitment tools to find top-tier talent that meets your
          criteria.
        </li>
        <li>
          <strong>Screening and Selection:</strong> Our team conducts detailed
          screenings to shortlist candidates. We handle interviews, background
          checks, and skill assessments to ensure only the best candidates are
          presented to you.
        </li>
        <li>
          <strong>Hiring and Onboarding:</strong> Once you select a candidate,
          we assist with the onboarding process, ensuring a smooth transition
          and quick integration into your team.
        </li>
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
        <Col
          lg={6}
          md={12}
          data-aos="new-animation-right"
          data-aos-duration="300"
          data-aos-easing="ease-in"
        >
          <SectionHeading title={title} />
          {description}
        </Col>
        <Col
          lg={6}
          md={12}
          data-aos="zoom-out"
          data-aos-duration="300"
          data-aos-easing="ease-in"
        >
          <img
            src={applyImg}
            alt="How It Works"
            style={{ width: "auto", height: "auto", borderRadius: 10 }}
          />
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
