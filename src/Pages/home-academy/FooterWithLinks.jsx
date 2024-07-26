// import node module libraries
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, Container, ListGroup } from "react-bootstrap";

// import MDI icons
import Icon from "@mdi/react";
import { mdiFacebook, mdiTwitter, mdiInstagram, mdiYoutube } from "@mdi/js";

// import media files
// import FooterLogo from "../../assets/unleashified-logo.png";
import FooterLogo from "../../assets/LogoList/Coted'ivoire-Logo.png";

// Inside your component
const currentYear = new Date().getFullYear();

const FooterWithLinks = () => {
  return (
    <Fragment>
      <footer className="pt-lg-10 pt-5 footer bg-white">
        <Container>
          <Row>
            <Col lg={4} md={6} sm={12}>
              {/* about company  */}
              <div className="mb-4">
                <Image
                  src={FooterLogo}
                  alt=""
                  className="logo-inverse"
                  style={{ height: "60px", width: "80px" }}
                />
                <div className="mt-4">
                  <p>
                    PME Cote D'Ivoire Marketplace met en relation les demandeurs
                    d’emploi avec des opportunités et les récruteurs avec des
                    ressources talentueuses et engagées.
                  </p>
                  {/* social media */}
                  <div className="fs-4 mt-4">
                    <a
                      href="https://www.facebook.com/getfundedafricaoffical"
                      className="mdi mdi-facebook text-muted me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon path={mdiFacebook} size={0.7} />
                    </a>
                    <a
                      href="https://twitter.com/gfunded_africa"
                      className="mdi mdi-twitter text-muted me-2"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon path={mdiTwitter} size={0.7} />
                    </a>
                    <a
                      href="https://www.instagram.com/accounts/login/?next=/getfundedafrica/"
                      className="mdi mdi-instagram text-muted"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon path={mdiInstagram} size={0.7} />
                    </a>
                    <a
                      href="https://www.youtube.com/channel/UCADl1rDbt5BGQKkMfMBxsOQ"
                      className="mdi mdi-youtube text-muted me-2"
                      style={{ marginLeft: "10px" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon path={mdiYoutube} size={0.7} />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={{ span: 2, offset: 1 }} md={3} sm={6}>
              <div className="mb-4">
                {/* list */}
                <h3 className="fw-bold mb-3">Entreprise</h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/aboutus" className="nav-link">
                    À propos
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/pricing" className="nav-link">
                    Tarification
                    </Link>
                  </ListGroup.Item>
                  {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="" className="nav-link">
                      Blog
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Careers
                    </Link>
                  </ListGroup.Item> */}
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/contactUs" className="nav-link">
                      Contact
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col lg={2} md={3} sm={6}>
              <div className="mb-4">
                {/* list  */}
                <h3 className="fw-bold mb-3">Support</h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Help and Support
                    </Link>
                  </ListGroup.Item> */}
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/authentication/signup" className="nav-link">
                    Devenir Demandeurs D'emplois
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/authentication/signup" className="nav-link">
                    Devenir Recruteurs
                    </Link>
                  </ListGroup.Item>
                  {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Get the app
                    </Link>
                  </ListGroup.Item> */}
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/FAQs" className="nav-link">
                    Foire aux questions
                    </Link>
                  </ListGroup.Item>
                  {/* <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Tutorial
                    </Link>
                  </ListGroup.Item> */}
                </ListGroup>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12}>
              {/* contact info */}
              <div className="mb-4">
                <h3 className="fw-bold mb-3">Contactez-nous </h3>
                Côte d’Ivoire PME
                <br />
                3rd Floor, Unit 1110, Ogun State Technology Hub, Abeokuta,
                <br />
                Ogun State, Nigeria.
                <br />
                <a href="mailto:migration@gfa-tech.com" target="_blank">
                  support@PME Cote D'Ivoire Marketplace.com
                </a>
                {/* <p>
                  Phone:{" "}
                  <span className="text-dark fw-semi-bold">
                    (000) 123 456 789
                  </span>
                </p> */}
              </div>
            </Col>
          </Row>
          <Row className="align-items-center g-0 border-top py-2 mt-6">
            {/* Desc  */}
            <Col lg={4} md={5} sm={12}>
              <span>
                © {currentYear} PME Cote D'Ivoire Marketplace, Inc.Tous droits réservés
              </span>
            </Col>
            {/*  Links  */}
            <Col
              lg={8}
              md={7}
              sm={12}
              className="d-md-flex justify-content-end"
            >
              <nav className="nav nav-footer">
                <Link className="nav-link ps-0" to="/PrivacyPolicy">
                Politique de confidentialité
                </Link>
                {/* <Link className="nav-link px-2 px-md-3" to="#">
                  Cookie Notice
                </Link> */}
                {/* <Link className="nav-link d-none d-lg-block" to="#">
                  Do Not Sell My Personal Information
                </Link> */}
                <Link className="nav-link" to="/TermsOfUse">
                Conditions d’utilisation
                </Link>
              </nav>
            </Col>
          </Row>
        </Container>
      </footer>
    </Fragment>
  );
};

export default FooterWithLinks;
