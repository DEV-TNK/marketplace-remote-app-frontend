// import node module libraries
import { Col, Row, Container, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// import media files
import CaseStudyImage from "../assets/images/about/grace.jpg";

const CustomerStories = () => {
  return (
    <section className="py-lg-16 bg-white pt-8 pb-10">
      <Container>
        <Row>
          <Col xl={{ span: 10, offset: 1 }} md={12} xs={12}>
            <Row className="text-center">
              <Col md={12} className="px-md-16 mb-8 mt-6">
                <span className="text-uppercase text-primary fw-semi-bold ls-md">
                  Customer stories
                </span>
                <h2 className="h1 fw-bold mt-3  mb-2">
                  What our customer stories
                </h2>
                <p className="mb-0 fs-4">
                  A customer story is an engaging article integrating
                  testimonial quotes from a happy client or customer praising
                  the work completed together.
                </p>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col lg={7} md={12} xs={12}>
                <div className="mb-8 mb-lg-0 me-lg-4">
                  <p className="display-6 mb-4 lh-2">
                    "PME Cote D'Ivoire Marketplace has transformed our hiring strategy, providing
                    seamless access to top talent. With its innovative
                    resources, we've streamlined recruitment and built a
                    high-performing team!."
                  </p>
                  <p className="mb-0 ">Grace Oluwalola</p>
                  <span className="">
                    Chief Operating Officer at Easereads
                  </span>
                </div>
              </Col>
              <Col lg={5} md={12} xs={12}>
                <div>
                  <Image
                    src={CaseStudyImage}
                    alt=""
                    className="img-fluid rounded-3 w-100"
                    style={{ height: "400px" }}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              {/* <Col xs>
								<Link to="/authentication/signin">
								<Button
									variant="outline-primary"
									className="mt-lg-2 mt-4"
								>
									View All Stories
								</Button>
								</Link>
								
							</Col> */}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CustomerStories;
