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
              Trouvez la bonne personne pour répondre aux besoins de votre entreprise
              </h2>
              <p className="fw-bold mt-3 text-white fs-4">
              PME Cote D'Ivoire Marketplace rassemble des prestataires de services de différents secteurs et lieux sur une seule plateforme
              </p>
              <Link to="/authentication/signin">
              <Button variant="primary" className="mt-3">
              Commencez
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
