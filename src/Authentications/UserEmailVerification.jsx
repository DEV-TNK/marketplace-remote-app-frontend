import { useState, useEffect } from "react";
import { Button, Col, Row, Card, Image, Navbar } from "react-bootstrap";
import axios from "axios";
import { showToast } from "../Components/Showtoast";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const UserEmailVerification = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  // const baseUrl = import.meta.env.EASEREADS_BASE_URL;

  const verifyUserToken = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://unleashified-backend.azurewebsites.net/api/v1/verify-email`,
        {
          verificationToken: queryParam.get("token"),
          email: queryParam.get("email"),
        }
      );
      if (
        response.data.msg === "Email verified successfully" ||
        response.data.msg === "Email has been verified"
      ) {
        sessionStorage.setItem("isVerified", "true");
        setIsVerified(true);
        showToast(response.data.msg);
      } else {
        setError(true);
        showToast(response.data.msg);
      }
    } catch (error) {
      setError(true);
      showToast(error.response.data.msg);
    }
    setLoading(false);
  };

  // resend email verification
  const resendEmail = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://unleashified-backend.azurewebsites.net/api/v1/resend-email`,
        {
          email: queryParam.get("email"),
        }
      );
      setLoading(false);
      showToast(response.data.message);
    } catch (error) {
      setLoading(false);
      showToast(error.response.data.message);
    }
  };

  useEffect(() => {
    verifyUserToken();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-10">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col
          lg={12}
          md={12}
          className="d-flex align-items-center justify-content-center"
        >
          <Card className="shadow-sm p-5">
            {" "}
            {/* Increased padding from p-4 to p-5 */}
            <Row className="align-items-center justify-content-center">
              {/* Left arrow */}

              {/* Center Logo */}
              <Col lg={10} md={9} className="text-center">
                <h1 className="fs-4">
                  An error occur while verifying your account please click on
                  the button below to request for a new verification link
                </h1>
              </Col>
              <Col lg={10} md={9} className="text-center">
                <Button variant="primary" type="submit" onClick={resendEmail}>
                  Resend Email
                </Button>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-center mt-5 "></Row>
          </Card>
        </Col>
      </Row>
    );
  }

  if (isVerified || sessionStorage.isVerified === "true") {
    return (
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col
          lg={12}
          md={12}
          className="d-flex align-items-center justify-content-center"
        >
          <Card className="shadow-sm p-5">
            {" "}
            {/* Increased padding from p-4 to p-5 */}
            <Row className="align-items-center justify-content-center">
              <Col lg={10} md={9} className="text-center">
                <h1 className="fs-3 mb-4">Your Email has been verified</h1>
              </Col>
              <Col lg={10} md={9} className="text-center">
                <Button
                  variant="primary"
                  type="submit"
                  as={Link}
                  to="/authentication/signin"
                >
                  Please Login
                </Button>
              </Col>
            </Row>
            <Row className="align-items-center justify-content-center mt-5 "></Row>
          </Card>
        </Col>
      </Row>
    );
  }
  return null;
};

export default UserEmailVerification;
