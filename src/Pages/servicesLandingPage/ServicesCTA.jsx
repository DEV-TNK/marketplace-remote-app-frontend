// Section : Hero
// Style : Call To Action

// import node module libraries
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import media files
import BottomImage from "../../assets/images/hero/hero-img (1).png";

const ServicesCTA = () => {
  return (
    <section className="bg-primary">
      <Container>
        <Row className="align-items-center g-0">
          <Col xl={6} lg={6} md={12} sm={12}>
            {/* Heading */}
            <div className="pt-6 pt-lg-0">
              <h1 className="text-white display-4 fw-bold pe-lg-8">
                Ready to Get Started?
              </h1>
              <p className="text-white-50 mb-4 lead">
                Join our community today and connect with top professionals and
                clients. Whether you're looking to hire an expert or offer your
                own services, Unleashified is the place to be. Sign up now and
                discover the benefits of our dynamic services marketplace.
              </p>
              {/*Button */}
              <Link to="/jobs/services-list/" className="btn btn-dark" style={{marginRight: 5}}>
                Explore services
              </Link>
              <Link to="/jobs/services-list/" className="btn btn-dark">
                Get started
              </Link>
            </div>
          </Col>
          {/* Image */}
          <Col
            xl={6}
            lg={6}
            md={12}
            sm={12}
            className="text-lg-end text-center pt-6"
          >
            <Image src={BottomImage} alt="" className="img-fluid" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ServicesCTA;
