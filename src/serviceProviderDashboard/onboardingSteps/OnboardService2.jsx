
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import "./Step2.css";
import user from "../../assets/images/avatar/step2Person.jpg";


const Step2 = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <img
            style={{
              height: "full",
            }}
            src={user}
            alt="Profile setup illustration"
            className="img-fluid rounded"
          />
        </Col>
        <Col
          md={6}
          className="d-flex flex-column justify-content-center  mt-5 mt-md-0"
        >
          <h2>What makes a successful Unleashified profile?</h2>
          <p>
            Your first impression matters! Create a profile that will stand out
            from the crowd on Fiverr.
          </p>
          <Row>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-user fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                  Take your time in creating your profile so it’s exactly as you
                  want it to be.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-link fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                  Add credibility by linking out to your relevant professional
                  networks.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-camera fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                  Put a face to your name! Upload a profile picture that clearly
                  shows your face on your dashboard.
                </h5>
              </div>
            </Col>
            <Col xs={6} className="d-flex mb-4">
              <i className="fa fa-lock fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>
                  To keep our community secure for everyone, we may ask you to
                  verify your ID.
                </h5>
              </div>
            </Col>
          </Row>
          <div className="d-flex ">
            <Link to="/service/onboarding_step3">
              <Button variant="success" className="me-2">
                Continue
              </Button>
            </Link>

            <Link to="/service/onboarding_step1">
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

export default Step2;
