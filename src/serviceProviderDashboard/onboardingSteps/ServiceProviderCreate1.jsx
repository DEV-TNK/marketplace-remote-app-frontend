
import { Container, Row, Col, Button } from "react-bootstrap";
// import "./index.css";
import { Link } from "react-router-dom";
import user from "../../assets/images/avatar/samuel.jpg";

const Step1 = () => {
  return (
    <Container fluid className="my-5 px-md-8">
      <Row>
        <Col md={6} className="d-flex flex-column justify-content-center">
          <h2>Ready to start selling on Unleashified?</h2>
          <h3>Here&apos;s the breakdown:</h3>
          <div className="my-4">
            <div className="d-flex align-items-center mb-3">
              <i className="fa fa-laptop fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>Learn what makes a successful profile</h5>
                <p>
                  Discover the do&apos;s and don&apos;ts to ensure you&apos;re always on the
                  right track.
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <i className="fa fa-user fa-2x me-3" aria-hidden="true"></i>
              <div>
                <h5>Create your seller profile</h5>
                <p>
                  Add your profile picture, description, and professional
                  information.
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <i
                className="fa fa-shopping-bag fa-2x me-3"
                aria-hidden="true"
              ></i>
              <div>
                <h5>Publish your Service</h5>
                <p>
                  Create a Gig of the service you&apos;re offering and start selling
                  instantly.
                </p>
              </div>
            </div>
          </div>
          <Link to="/service/onboarding_step2">
            <Button variant="success" size="lg">
              Continue
            </Button>
          </Link>
        </Col>
        <Col
          md={6}
          style={{
            backgroundColor: "#754FFE",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
          className="d-flex w-md-50  justify-content-center align-items-center mt-5 mt-md-0"
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <img
              src={user}
              alt="profile"
              className="rounded-circle"
              width="150"
              height="150"
            />
            <h4 className="mt-3">Samuel</h4>
            <p>Web developer</p>
            <p className="text-warning mb-1">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </p>
            <p className="text-muted">(100 reviews)</p>
            <Button variant="link">
              <i className="fa fa-play-circle fa-2x"></i>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Step1;
