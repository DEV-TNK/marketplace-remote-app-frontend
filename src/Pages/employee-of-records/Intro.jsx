import React, { useEffect, useRef } from "react";

// import node module libraries
import { Col, Row, Container } from "react-bootstrap";

import introImg from "./images/blackoffice.jpg";
import "./styles.css";
import AOS from "aos"; //for slide in animation
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init({
  delay: 1000,
  throttleDelay: 99,
});

const Intro = () => {
  return (
    <section className="py-lg-16 py-10">
      <Container>
        <Row>
          <Col
            lg={6}
            md={12}
            sm={12}
            className="mb-6 order-lg-2"
            data-aos="new-animation-left"
            // data-aos="slide-left"
            data-aos-duration="300"
            data-aos-easing="ease-in"
          >
            {/* caption */}
            <h2 className="text-primary fw-bold">What We Offer</h2>
            
            {/* New content */}
            <div className="offerings">
              <h3 className="text-secondary fw-bold">
                1. Tailored Talent Acquisition:
              </h3>
              <p>
                We specialize in sourcing and selecting candidates with the
                exact skill sets you need. From tech wizards to marketing gurus,
                we ensure you find the right fit for your team.
              </p>

              <h3 className="text-secondary fw-bold">
                2. Comprehensive Screening Process:
              </h3>
              <p>
                Our rigorous screening methods include background checks, skill
                assessments, and thorough interviews, ensuring you get the best
                candidates without the hassle.
              </p>

              <h3 className="text-secondary fw-bold">
                3. Efficient Hiring Solutions:
              </h3>
              <p>
                Save time and resources by letting us handle the complexities of
                hiring. Our experienced team manages everything from job
                postings to onboarding.
              </p>

              <h3 className="text-secondary fw-bold">4. Industry Expertise:</h3>
              <p>
                With a deep understanding of various industries, we bring you
                candidates who are not only skilled but also aligned with your
                company’s culture and goals.
              </p>
            </div>
          </Col>
          <Col
            lg={6}
            md={12}
            sm={12}
            className="mb-6 order-lg-1"
            data-aos="new-animation-right"
            // data-aos="slide-right"
            data-aos-duration="300"
            data-aos-easing="ease-in-out-sine"
          >
            <img
              src={introImg}
              alt="Who we are image"
              className="img-fluid mt-8"
              style={{ maxWidth: "100%", borderRadius: "10px" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Intro;
