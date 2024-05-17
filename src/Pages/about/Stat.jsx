// import node module libraries
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

// import sub components
import SectionHeading from "./SectionHeading";

const Stat = () => {
  const title = "Our core values";
  const description = `Innovating the future of employment by connecting job seekers with opportunities that match their skills and aspirations, Unleashified empowers individuals to thrive in their careers while supporting businesses in finding the right talent to succeed`;

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
      <SectionHeading title={title} description={description} />
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
