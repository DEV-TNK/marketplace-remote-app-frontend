import React from 'react'

// import node module libraries
import { Col, Row } from 'react-bootstrap';

import heroImg from "./images/startup.jpg"


const HeroContent = () => {
  return (
<Row>
      <Col lg={6} md={12} sm={12} className="mb-12">
        {/* caption */}
        <h1 className="display-2 fw-bold mb-3">
        Discover and Offer Top Services
        </h1>
        <h2 className="text-primary fw-bold"> Connect with professionals and clients in just a few clicks</h2>
        {/* para */}
        <p className="h3 mb-3 ">
        Welcome to Unleashified, your ultimate destination for finding and offering professional services. Whether you're looking to hire an expert or showcase your own skills, we make it easy to connect with the right people. Start your journey with us today!
        </p>
        {/* <p className="mb-0 h4 text-body lh-lg">
          We're creating a vibrant community that fosters growth, collaboration, and innovation. We strive to bridge the gap between entrepreneurs, users, service providers, and job seekers by offering a comprehensive platform that caters to their diverse needs.
        </p> */}
      </Col>
      <Col lg={6} md={12} sm={12} className="mb-12 ml-2">
        <img
          src={heroImg}
          alt="hero image"
          className="img-fluid mt-8"
          style={{ maxWidth: 'auto',maxHeight: 'auto', borderRadius: '10px' }}
        />
      </Col>
    </Row>
  )
}

export default HeroContent