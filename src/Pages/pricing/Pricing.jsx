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
                  Une tarification simple qui s’adapte à votre entreprise
                </h1>
                <p className="text-white lead mb-4">
                  Parcourez les prix qui correspondent à vos besoins pour
                  commencer sur PME Cote D'Ivoire Marketplace
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
                En plus de faciliter les contrats entre les fournisseurs
                d’emploi et les demandeurs d’emploi, notre plateforme utilise un
                système de séquestre pour assurer la sécurité et la confiance.
                Lorsqu’un fournisseur de travaux paie pour un travail
                particulier, les fonds sont conservés en toute sécurité sous
                séquestre jusqu’à ce que les travaux soient terminés à la
                satisfaction des deux parties. Une fois l’achèvement réussi, le
                paiement convenu est versé aux chercheurs d’emploi. Dans le
                cadre de notre service, nous facturons des frais de 5% sur le
                paiement total effectué par le fournisseur de travail lors d’un
                contrat. Ces frais couvrent l’utilisation de notre plateforme, y
                compris des fonctionnalités telles que la protection contre le
                séquestre, la résolution des litiges et l’accès à notre réseau
                de chercheurs d’emploi talentueux. En fournissant ce service,
                nous visons à créer un marché transparent et fiable pour que les
                fournisseurs d’emploi et les chercheurs d’emploi prospèrent.
              </span>
            </h3>
          </div>
        </div>

        <Container>
          <Row>
            {/* Row */}
            <Col md={12} sm={12}>
              <div className="mb-8 mt-10 text-center">
                <h1>Foire aux questions</h1>
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
                    <h4 className="mb-0">Vous avez d’autres questions ?</h4>
                    <span>
                    Envoyez-nous un mail via :{" "}
                      <a href="mailto:migration@gfa-tech.com" target="_blank">
                      support@PME Côte d’Ivoire Marketplace.com
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
