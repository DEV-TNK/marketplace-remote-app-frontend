// Section : Hero
// Style : Call To Action

// import node module libraries
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import media files
import BottomImage from "../../assets/images/hero/hero-img (1).png";

const JobsCTA = () => {
  return (
    <section className="bg-primary">
      <Container>
        <Row className="align-items-center g-0">
          <Col xl={6} lg={6} md={12} sm={12}>
            {/* Heading */}
            <div className="pt-6 pt-lg-0">
              <h1 className="text-white display-4 fw-bold pe-lg-8">
              Ready to Find Your Next Job?
              </h1>
              <p className="text-white-50 mb-4 lead">
              Sign up now and start applying today. Don’t miss out on your next career opportunity. Join Unleashified today and take the next step towards a brighter future.
              </p>
              {/*Button */}
              <Link to="/jobs/listing/job-list/" className="btn btn-dark">
                Apply For Job
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

export default JobsCTA;
