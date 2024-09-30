import React from "react";

// import node module libraries
import { Col, Row } from "react-bootstrap";

import heroImg from "../../Pages/servicesLandingPage/images/outsourceHeroImg3.jpg";


const HeroContent = () => {
  return (
    <Row>
      <Col
        lg={6}
        md={12}
        sm={12}
        className="mb-12"
        data-aos="fade-right"
        data-aos-duration="300"
        data-aos-easing="ease-in"
      >
        {/* caption */}
        <h1 className="display-2 fw-bold mb-3">Find Your Next Opportunity</h1>
        <h2 className="text-primary fw-bold">
          {" "}
          Explore thousands of job listings from top companies and apply in just
          a few clicks.
        </h2>
        {/* para */}
        <p className="h3 mb-3 ">
          Welcome to PME Cote D'Ivoire Marketplace, your go-to destination for finding the
          perfect job. Whether you’re a recent graduate, a seasoned
          professional, or looking for a career change, we have opportunities
          that match your skills and aspirations. Start your journey with us
          today and take the first step towards your dream job.
        </p>
        {/* <p className="mb-0 h4 text-body lh-lg">
          We're creating a vibrant community that fosters growth, collaboration, and innovation. We strive to bridge the gap between entrepreneurs, users, service providers, and job seekers by offering a comprehensive platform that caters to their diverse needs.
        </p> */}
      </Col>
      <Col
        lg={6}
        md={12}
        sm={12}
        className="mb-12"
        data-aos="zoom-in"
        data-aos-duration="300"
        data-aos-easing="ease-in"
      >
        <img
          src={heroImg}
          alt="hero image"
          className="img-fluid mt-8"
          style={{ maxWidth: "auto", maxHeight: "150%", borderRadius: "10px" }}
        />
      </Col>
    </Row>
  );
};

export default HeroContent;
