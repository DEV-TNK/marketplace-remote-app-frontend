
import { Container, Row, Col, Button } from "react-bootstrap";
// import "./index.css";
import { Link } from "react-router-dom";
import user from "../../assets/images/avatar/samuel.jpg";

const Step1 = () => {
  return (
    <Container fluid className="my-5 px-md-8">
      <Row>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2>Prêt à commencer à vendre sur PME Cote D'Ivoire Marketplace ?</h2>
          <h3>Voici&apos;s  un récapitulatif:</h3>
          <div className="my-4">
            <div className="d-flex align-items-center mb-3">
              <i className="fa fa-laptop fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>Apprenez ce qui fait un profil réussi</h5>
                <p>
                Découvrez les choses à faire et à ne pas faire pour vous assurer que vous êtes toujours sur la bonne voie.
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <i className="fa fa-user fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>Créez votre profil de vendeur</h5>
                <p>
                Ajoutez votre photo de profil, une description et vos informations professionnelles.
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <i
                className="fa fa-shopping-bag fa-2x me-3"
                aria-hidden="true"
              ></i>
              <div>
                <h5>Publiez votre service</h5>
                <p>
                Créez une offre (Gig) du service que vous proposez et commencez à vendre instantanément.
                </p>
              </div>
            </div>
          </div>
          <Link to="/service/onboarding_step2">
            <Button variant="success" size="lg">
              Continuer
            </Button>
          </Link>
        </Col>
        <Col
          md={6}
          style={{
            backgroundColor: "#754FFE",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
          className="d-flex w-md-50  justify-content-center align-items-center mt-5 mt-md-0"
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <img
              src={user}
              alt="profile"
              className="rounded-circle"
              width="150"
              height="150"
            />
            <h4 className="mt-3">Samuel</h4>
            <p>Web developer</p>
            <p className="text-warning mb-1">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </p>
            <p className="text-muted">(100 reviews)</p>
            <Button variant="link">
              <i className="fa fa-play-circle fa-2x"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Step1;
