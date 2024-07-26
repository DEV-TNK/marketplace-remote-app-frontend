// Section : Team Section
// Style : Grid with round images

// import node module libraries
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import custom components
import GKTippy from "../../Components/elements/tooltips/GKTippy";

// import data files
import OurTeamData from "../../data/marketing/AboutusOurTeamData";

const TeamGridRoundImages = () => {
  return (
    <section className="py-lg-16 py-10 bg-white">
      <Container>
        <Row>
          <Col md={6} sm={12} className="offset-right-md-6 mb-10">
            {/* <!-- heading --> */}
            <h2 className="display-4 mb-3 fw-bold">Notre équipe</h2>
            {/* <!-- lead --> */}
            <p className="lead mb-5">
              Vous cherchez à vous engager avec des professionnels qualifiés
              dans le monde entier et à contribuer à une plateforme innovante
              utilisée par des organisations de premier plan ? Rejoignez notre
              équipe collaborative chez Unleahified, où vous pouvez influencer
              l’évolution des demandeurs d’emploi et des recruteurs.
              Rejoignez-nous pour façonner l’avenir des opportunités et des
              solutions d’emploi.
            </p>
            {/* <!-- btn --> */}
            <Link to="#" className="btn btn-primary">
              Openings
            </Link>
          </Col>
        </Row>
        <Row>
          {OurTeamData.map((item, index) => (
            <Col md={2} sm={3} key={index} className="col-3">
              <div className="p-xl-5 p-lg-3 mb-3 mb-lg-0">
                <GKTippy
                  content={
                    <span>
                      <span className="fs-4">{item.name} </span>
                      <br />
                      <span className="fs-4 fw-light">{item.designation} </span>
                    </span>
                  }
                >
                  <Image
                    src={item.image}
                    alt=""
                    className="imgtooltip img-fluid rounded-circle"
                    style={{ maxHeight: "100px", width: "100px" }}
                  />
                </GKTippy>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TeamGridRoundImages;
