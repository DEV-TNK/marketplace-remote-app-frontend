// Section : Hero Header
// Style : Welcome Text on left and image on right

// import node module libraries
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import media files
import HeroImage from "../../assets/images/hero/hero-img (1).png";

const HeroHeader = () => {
  return (
    <section className="bg-primary">
      <Container>
        {/*  Hero Section  */}
        <Row className="align-items-center g-0">
          <Col xl={5} lg={6} md={12}>
            <div className="py-5 py-lg-0">
              <h1 className="text-white display-4 fw-bold">
              Bienvenue sur Marketplace
              </h1>
              <p className="text-white-50 mb-4 lead">
              Des mentors soigneusement choisis et des ressources soigneusement élaborées, adaptées aux personnes à la recherche d’opportunités d’emploi et aux employeurs qui cherchent à pourvoir des postes.
              </p>
              <Link to="/jobs/listing/job-list/" className="btn btn-dark">
              Parcourir les offres d’emploi
              </Link>
              <Link
                to="/authentication/signup"
                className="btn btn-white m-lg-2 "
              >
                Êtes-vous un fournisseur d’emploi ?
              </Link>
            </div>
          </Col>
          <Col xl={7} lg={6} md={12} className="text-lg-end text-center">
            <Image src={HeroImage} alt="" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default HeroHeader;
