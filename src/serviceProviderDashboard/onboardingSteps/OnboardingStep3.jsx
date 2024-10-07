
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import user from "../../assets/images/avatar/dont.jpg";

const Step3 = () => {
  return (
    <Container className="my-5">
      <Row className="mt-md-15">
        <Col md={6}>
          <img src={user} alt="Working space" className="img-fluid rounded" />
        </Col>
        <Col
          md={6}
          className="d-flex flex-column justify-content-center mt-5 mt-md-0"
        >
          <h2>Maintenant, parlons des choses à éviter.</h2>
          <p>
            Votre succès sur Unleashified nous tient à cœur. Évitez les éléments suivants pour respecter nos normes communautaires :
          </p>
          <Row>
            <Col xs={6} className="d-flex mb-4">
              <i
                className="fa fa-info-circle fa-2x me-3"
                aria-hidden="true"
              ></i>
              <div>
                <h5>
                Fournir des informations trompeuses ou inexactes sur votre identité.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-clone fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                Ouvrir des comptes en double. Rappelez-vous, vous pouvez toujours créer plus d'offres (Gigs).
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-handshake fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>Solliciter d'autres membres de la communauté pour travailler sur Fiverr.</h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-bullseye fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                Demander à poursuivre la communication et les paiements en dehors de Fiverr. 
                </h5>
              </div>
            </Col>
          </Row>
          <div className="d-flex ">
            <Link to="/service/onboarding_step4">
              <Button variant="success" className="me-2">
                Continuer
              </Button>
            </Link>

            <Link to="/service/onboarding_step2">
              <Button variant="link" className="text-muted">
              Retour
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Step3;
