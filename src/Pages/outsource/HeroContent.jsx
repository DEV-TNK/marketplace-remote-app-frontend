import React from 'react'

// import node module libraries
import { Col, Row } from 'react-bootstrap';

import heroImg from "./images/outsourceHeroImg3.jpg"


const HeroContent = () => {
  return (
<Row>
      <Col lg={6} md={12} sm={12} className="mb-12">
        {/* caption */}
        <h1 className="display-2 fw-bold mb-3">
        Business Process Outsourcing
        </h1>
        <h2 className="text-primary fw-bold">WE HELP BUSINESSES SUCCEED BY COMPLEMENTING THEIR STRENGTHS.</h2>
        {/* para */}
        <p className="h3 mb-3 ">
        At Unleashified, we understand that every business has its strengths. That's why we're here to complement them. Our tailored outsourcing solutions are designed to seamlessly integrate with your operations, allowing you to focus on what you do best while we handle the rest. From administrative tasks to specialized projects, our team of experts is dedicated to driving efficiency, productivity, and growth for your business. Partner with us and unlock the full potential of your enterprise today.
        </p>
        {/* <p className="mb-0 h4 text-body lh-lg">
          We're creating a vibrant community that fosters growth, collaboration, and innovation. We strive to bridge the gap between entrepreneurs, users, service providers, and job seekers by offering a comprehensive platform that caters to their diverse needs.
        </p> */}
      </Col>
      <Col lg={6} md={12} sm={12} className="mb-12">
        <img
          src={heroImg}
          alt="hero image"
          className="img-fluid mt-8"
          style={{ maxWidth: 'auto',maxHeight: '150%', borderRadius: '10px' }}
        />
      </Col>
    </Row>
  )
}

export default HeroContent