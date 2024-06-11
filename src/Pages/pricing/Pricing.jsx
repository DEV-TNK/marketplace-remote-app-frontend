// import node module libraries
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container, Form, Card } from "react-bootstrap";

// import hooks
import useToggle from "../../hooks/useToggle";

// import custom components
import LogosTopHeading2 from "../../Components/marketing/common/clientlogos/LogosTopHeading2";

// import sub components
import PricingCard from "./PricingCard";

// import data files
import {
  starter,
  individual,
  team,
} from "../../data/marketing/pricing/PricingPlansData";
import LogoList1 from "../../data/marketing/clientlogos/LogoList1";
import FAQsData from "../../data/marketing/pricing/FAQsData";

import NavbarJobsPages from "../../Layout/navbars/NavbarJobPages";

import FooterWithLinks from "../home-academy/FooterWithLinks";

const Pricing = () => {
  const [Pricing, togglePricing] = useToggle(true);

  return (
    <Fragment>
      <NavbarJobsPages />
      <section className="py-lg-13 py-8 bg-primary">
        <Container>
          {/* Page header */}
          <Row className="align-items-center">
            <Col xl={{ span: 8, offset: 2 }} lg={12} md={12} sm={12}>
              <div className="text-center mb-6 px-md-8">
                <h1 className="text-white display-3 fw-bold">
                  Simple pricing that scales with your needs
                </h1>
                <p className="text-white lead mb-4">
                  See how we price our users on unleashified
                </p>

                {/* Switch Toggle */}
                {/* <div
                  id="pricing-switch"
                  className="d-flex justify-content-center align-items-center"
                >
                  <span className="text-white me-2">Monthly</span>
                  <Form>
                    <Form.Check
                      name="radios"
                      type="checkbox"
                      className="form-switch form-switch-price"
                      id="pricingSwitch"
                      checked={Pricing}
                      onChange={togglePricing}
                    />
                  </Form>
                  <span className="text-white ms-2">Yearly</span>
                </div> */}
              </div>
              <div></div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Content */}

      {/* <section className="mt-n8 pb-8">
        <Container>
          <Row>
            <Col lg={4} md={12} sm={12}>
              <PricingCard content={starter} pricingMode={Pricing} />
            </Col>
            <Col lg={4} md={12} sm={12}>
              <PricingCard content={individual} pricingMode={Pricing} />
            </Col>
            <Col lg={4} md={12} sm={12}>
              <PricingCard content={team} pricingMode={Pricing} />
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Client logo */}
      {/* <LogosTopHeading2
        title="Loved by over 5 thousand users from companies like"
        logos={LogoList1}
      /> */}

      {/* FAQ */}
      <section className="py-lg-10 py-5">
        <div style={{ textAlign: "center" }}>
          <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
            <h3 style={{ textAlign: "center" }}>
              <span style={{ color: "black" }}>
                In addition to facilitating contracts between job providers and
                job seekers, our platform employs an escrow system to ensure
                security and trust. When a job provider pays for a particular
                job, the funds are securely held in escrow until the work is
                completed to the satisfaction of both parties. Upon successful
                completion, the agreed-upon payment is released to the job
                seekers. As part of our service, we charge a fee of 5% on the
                total payment made by the job provider during a contract. This
                fee covers the use of our platform, including features like
                escrow protection, dispute resolution, and access to our network
                of talented job seekers. By providing this service, we aim to
                create a transparent and reliable marketplace for both job
                providers and job seekers to thrive.
              </span>
            </h3>
          </div>
        </div>

        <Container>
          <Row>
            {/* Row */}
            <Col md={12} sm={12}>
              <div className="mb-8 mt-10 text-center">
                <h1>Frequently Asked Questions</h1>
              </div>
            </Col>
          </Row>
          {/* Row */}
          <Row>
            {/* FAQs List */}
            {FAQsData.map((item, index) => {
              return (
                <Col lg={4} md={6} sm={12} className="mb-3" key={index}>
                  <h4>{item.question}</h4>
                  <p>{item.answer}</p>
                </Col>
              );
            })}
            {/* Col */}
            <Col md={12} sm={12} className="mt-lg-10 mt-4">
              {/* Card*/}
              <Card>
                {/* Card body */}
                <Card.Body>
                  <div className="d-lg-flex justify-content-between align-items-center">
                    <h4 className="mb-0">Have other questions?</h4>
                    <span>
                      Send us a mail via:{" "}
                      <a href="mailto:migration@gfa-tech.com" target="_blank">
                        support@unleashified.com
                      </a>
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      <FooterWithLinks />
    </Fragment>
  );
};

export default Pricing;
