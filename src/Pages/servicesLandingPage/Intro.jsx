import React from 'react'

// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';


import introImg from "../../Pages/servicesLandingPage/outsourceHeroImg.jpg"


const Intro = () => {
  return (
    <section className='py-lg-16 py-10'>
        <Container>
           <Row>
            <Col lg={6} md={12} sm={12} className="mb-6 order-lg-2">
                {/* caption */}
                <h2 className="text-primary fw-bold">WHO WE ARE</h2>
                <h1 className="display-3 fw-bold mb-3">
                At Unleashified, we are empowering Careers, Connecting Talent with Opportunity
                </h1>
                
                {/* para */}
                <p className="h2 mb-3 ">
                At Unleashified, we believe in the power of connection. Our mission is to bridge the gap between talented individuals and organizations in need of their skills. We are a passionate team of innovators, dedicated to transforming the job search and hiring experience.
                </p>
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