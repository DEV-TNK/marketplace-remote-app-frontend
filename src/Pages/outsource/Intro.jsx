import React from 'react'

// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';


import introImg from "./images/outsourceHeroImg.jpg"


const Intro = () => {
  return (
    <section className='py-lg-16 py-10'>
        <Container>
           <Row>
            <Col lg={6} md={12} sm={12} className="mb-6 order-lg-2">
                {/* caption */}
                <h2 className="text-primary fw-bold">WHO WE ARE</h2>
                <h1 className="display-2 fw-bold mb-3">
                At Unleashified, we are more than just an outsourcing platform
                </h1>
                
                {/* para */}
                <p className="h2 mb-3 ">
                we're your dedicated ally in achieving operational excellence. Backed by a team of industry professionals, we bring a wealth of expertise and a commitment to delivering exceptional results.
                </p>
                {/* <p className="mb-0 h4 text-body lh-lg">
                We're creating a vibrant community that fosters growth, collaboration, and innovation. We strive to bridge the gap between entrepreneurs, users, service providers, and job seekers by offering a comprehensive platform that caters to their diverse needs.
                </p> */}
            </Col>
            <Col lg={6} md={12} sm={12} className="mb-6 order-lg-1">
                <img
                src={introImg}
                alt="Who we are image"
                className="img-fluid mt-8"
                style={{ maxWidth: '100%', borderRadius: '10px' }}
                />
            </Col>
            </Row>   
        </Container>
        
    </section>

  )
}

export default Intro