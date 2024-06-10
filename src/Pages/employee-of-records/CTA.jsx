// Section : Hero
// Style : Call To Action

// import node module libraries
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import media files
import BottomImage from "../../assets/images/hero/hero-img (1).png";

const CTA = () => {
  return (
    <section className="bg-primary">
      <Container>
        <Row className="align-items-center g-0">
          <Col xl={6} lg={6} md={12} sm={12}>
            {/* Heading */}
            <div className="pt-6 pt-lg-0">
              <h1 className="text-white display-4 fw-bold pe-lg-8">
                Ready to find your next star employee? Get in touch with us
                today!
              </h1>
              <p className="text-white-50 mb-4 lead">
                Let Employee of Records take the stress out of hiring so you can
                focus on what you do best—growing your business. Partner with us
                today and discover a smarter way to build your dream team.
              </p>
              {/*Button */}
              <Link to="" className="btn btn-dark">
              Contact Us
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

export default CTA;
