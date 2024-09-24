
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import user from "../../assets/images/avatar/dont.jpg";

const Step3 = () => {
  return (
    <Container className="my-5">
      <Row className="mt-md-15">
        <Col md={6}>
          <img src={user} alt="Working space" className="img-fluid rounded" />
        </Col>
        <Col
          md={6}
          className="d-flex flex-column justify-content-center mt-5 mt-md-0"
        >
          <h2>Now, let’s talk about the things you want to steer clear of.</h2>
          <p>
            Your success on Unleashifed is important to us. Avoid the following
            to keep in line with our community standards:
          </p>
          <Row>
            <Col xs={6} className="d-flex mb-4">
              <i
                className="fa fa-info-circle fa-2x me-3"
                aria-hidden="true"
              ></i>
              <div>
                <h5>
                  Providing any misleading or inaccurate information about your
                  identity.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-clone fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                  Opening duplicate accounts. Remember, you can always create
                  more Gigs.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-handshake fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>Soliciting other community members for work on Fiverr.</h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-bullseye fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                  Requesting to take communication and payment outside of
                  Fiverr.
                </h5>
              </div>
            </Col>
          </Row>
          <div className="d-flex ">
            <Link to="/service/onboarding_step4">
              <Button variant="success" className="me-2">
                Continue
              </Button>
            </Link>

            <Link to="/service/onboarding_step2">
              <Button variant="link" className="text-muted">
                Back
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Step3;
