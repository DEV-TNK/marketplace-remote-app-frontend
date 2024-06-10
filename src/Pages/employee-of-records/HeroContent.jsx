import React from "react";
import { Col, Row } from "react-bootstrap";
import backgroundImg from "./images/unleashifiedDesktop.png";
import resImg from "./images/unleashifiedMobile.png";

const HeroContent = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Row className="align-items-center">
        <Col lg={6} md={12} sm={12} style={{ zIndex: 2, marginBottom: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "20px",
              position: "relative",
            }}
            className="text-container"
          >
            <h1 className="display-1 fw-bold mb-3">Employee Of Records</h1>
            <h2 className="text-primary fw-bold">
              Streamline Your Hiring Process with Precision and Expertise
            </h2>
            <p className="h3 mb-3">
              Welcome to Employee of Records, your trusted partner in finding
              the perfect talent for your organization. We understand that the
              success of any business hinges on the quality and skills of its
              employees. That’s why we’ve designed a comprehensive service to
              simplify and optimize your hiring process.
            </p>
          </div>
        </Col>
        <Col lg={6} md={12} sm={12} className="image-container">
          <div
            className="desktop-image d-none d-xl-block"
            style={{
              position: "relative",
              height: "700px",
              overflow: "hidden",
            }}
          >
            <img
              src={backgroundImg}
              style={{
                height: "700px",
                width: "1000px",
                objectFit: "cover",
                borderRadius: "5px 5px 0 0",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center right",
                position: "absolute",
                top: 0,
                right: "-350px",
              }}
              alt="Background"
            />
          </div>
          <div
            className="mobile-image d-xl-none"
            style={{
              position: "relative",
              maxWidth: "100%",
              height: "auto",
              overflow: "hidden",
            }}
          >
            <img
              src={resImg}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "5px 5px 0 0",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center right",
              }}
              alt="Background"
            />
          </div>
        </Col>
      </Row>
      <style jsx>{`
        body {
          overflow-x: hidden;
        }
        @media (min-width: 1200px) {
          .text-container {
            right: -100px; // Only apply overlap on extra large screens
          }
        }
      `}</style>
    </div>
  );
};

export default HeroContent;
