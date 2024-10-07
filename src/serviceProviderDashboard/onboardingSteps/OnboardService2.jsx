
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./Step2.css";
import user from "../../assets/images/avatar/step2Person.jpg";


const Step2 = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <img
            style={{
              height: "full",
            }}
            src={user}
            alt="Profile setup illustration"
            className="img-fluid rounded"
          />
        </Col>
        <Col
          md={6}
          className="d-flex flex-column justify-content-center  mt-5 mt-md-0"
        >
          <h2>Qu'est-ce qui fait un profil réussi sur PME Cote D'Ivoire Marketplace ?</h2>
          <p>
          Votre première impression compte ! Créez un profil qui se démarque de la foule sur Fiverr.
          </p>
          <Row>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-user fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                Prenez le temps de créer votre profil pour qu'il soit exactement comme vous le souhaitez.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-link fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                Ajoutez de la crédibilité en reliant vos réseaux professionnels pertinents.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-camera fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                Mettez un visage sur votre nom ! Téléchargez une photo de profil qui montre clairement votre visage sur votre tableau de bord.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-lock fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                Pour assurer la sécurité de notre communauté, nous pourrions vous demander de vérifier votre identité.
                </h5>
              </div>
            </Col>
          </Row>
          <div className="d-flex ">
            <Link to="/service/onboarding_step3">
              <Button variant="success" className="me-2">
                Continuer
              </Button>
            </Link>

            <Link to="/service/onboarding_step1">
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

export default Step2;
