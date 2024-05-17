import { Col, Row, Container, Button } from "react-bootstrap";
import backgroundImage from "../assets/images/brand/cta-background.webp";
import { Link } from "react-router-dom";

const FixRightPerson = () => {
  return (
    <section className="py-lg-14 bg-light pt-8 pb-10">
      <Container>
        <div
          className="py-lg-10  pt-8 py-10 bg-white rounded-3 "
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Row>
            <Col md={8} className="px-lg-10 mb-4 mt-2 text-left">
              <h2 className="h1 text-white fw-bold ls-md">
                Find the right person to fix your business needs
              </h2>
              <p className="fw-bold mt-3 text-white fs-4">
                Unleashified brings service providers in different industries
                and locations together on one platform
              </p>
              <Link to="/authentication/signin">
              <Button variant="primary" className="mt-3">
                Get Started
              </Button>
              </Link>
             
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default FixRightPerson;
