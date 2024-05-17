import { Col, Row, Container } from "react-bootstrap";

const WorksForSeller = () => {
  return (
    <section className="py-lg-10 pt-8 py-10 bg-white ">
      <Container>
        <Row className="text-center">
          <Col md={12} className="px-lg-10 mb-4 mt-2">
            <span className="text-uppercase text-primary fw-semi-bold ls-md">
              HOW DOES IT WORK FOR JOB PROVIDERS?
            </span>
            <h2 className="h1 fw-bold mt-3">
              Do you want to turn your knowledge, talent or hobby into income?
            </h2>
          </Col>
        </Row>
        <Row>
          <Col xl={12} md={12} xs={12}>
            <Row>
              {/* Card 1 */}
              <Col md={4} sm={12}>
                <div
                  className="text-center p-3 rounded card-bordered  card-hover cursor-pointer"
                  style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* Removed process-line class */}
                  <div className="icon-shape icon-lg fs-3 rounded-circle mb-4 text-primary smooth-shadow-md ">
                    1
                  </div>
                  <p className="mb-4">Create your Portfolio</p>
                  <h4>
                    Provide as much information about yourself as possible for a
                    potential buyer to make informed decision about what you
                    offer and experience or Knowledge you have about your
                    service&apos;s .
                  </h4>
                </div>
              </Col>
              {/* Card 2 */}
              <Col md={4} sm={12}>
                <div
                  className="text-center p-3 rounded card-bordered  card-hover cursor-pointer"
                  style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* Removed process-line class */}
                  <div className="icon-shape icon-lg fs-3 rounded-circle mb-4 text-primary smooth-shadow-md">
                    2
                  </div>
                  <p className="mb-4">Post your service</p>
                  <h4>
                    
Publish your service offering, and then assess different providers by comparing prices, portfolios, delivery time, and community feedback to find the one that aligns best with your requirements. If you have any specific inquiries, feel free to send them directly to the providers.
                  </h4>
                </div>
              </Col>
              {/* Card 3 */}
              <Col md={4} sm={12}>
                <div
                  className="text-center p-3 rounded card-bordered  card-hover cursor-pointer"
                  style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* Removed process-line class */}
                  <div className="icon-shape icon-lg fs-3 rounded-circle mb-4 text-primary smooth-shadow-md">
                    3
                  </div>
                  <p className="mb-4">Communicate promptly</p>
                  <h4>
                    Be as detailed as possible so the seller can provide you
                    with the quality service that you are expecting. Your
                    payment is held secure until you confirm that the service is
                    performed to your satisfaction.
                  </h4>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WorksForSeller;
