import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, Row, Navbar } from "react-bootstrap";
import Logo from "../assets/unleashified-logo.png";
import Logo2 from "../assets/LogoList/cote-logo.png";
import StudentSignUp from "./signupforms/JobSeeker";
import InstructorSignUp from "./signupforms/Provider";
import "./signupforms/signup.css"; // Import your CSS file
import NavbarDefault from "../Pages/home-academy/navbars/NavbarDefault";

const SignUp = () => {
  // State to manage which sign-up form to display
  const [showStudentSignUp, setShowStudentSignUp] = useState(false);
  const [showInstructorSignUp, setShowInstructorSignUp] = useState(false);

  // Function to handle showing student sign-up form
  const handleShowStudentSignUp = () => {
    setShowStudentSignUp(true);
    setShowInstructorSignUp(false);
  };

  // Function to handle showing instructor sign-up form
  const handleShowInstructorSignUp = () => {
    setShowStudentSignUp(false);
    setShowInstructorSignUp(true);
  };

  // Function to handle hiding sign-up forms
  const handleHideSignUpForms = () => {
    setShowStudentSignUp(false);
    setShowInstructorSignUp(false);
  };

  return (
    <Fragment>
      {/* <NavbarDefault /> */}
      <Row className="align-items-center h-100 w-100 justify-content-center ">
        {/* Main Container */}
        <Col
          lg={12}
          md={12}
          xs={12}
          className="d-flex "
          style={{ paddingRight: "0rem" }}
        >
          {/* Left Section */}
          <Col lg={5} md={5} className="fixed-left">
            <Card className="h-100 bg-primary "></Card>
          </Col>
          {/* Right Section */}
          <Col lg={7} md={7} xs={12} className="overflow-y-auto  ">
            {/* Right section content */}
            {/* Header */}
            <Card.Body className="py-6 px-3 ">
              <div className="mb-2">
                <Navbar.Brand as={Link} to="/">
                  <Image
                    src={Logo}
                    className="mb-4 text-center"
                    alt=""
                    style={{ height: "100px", width: "160px" }}
                  />
                </Navbar.Brand>
                <h1 className="mb-1 fw-bold">Sign up</h1>
                <span>
                  Already have an account?{" "}
                  <Link to="/authentication/signin" className="ms-1">
                    Sign In
                  </Link>
                </span>
              </div>
            </Card.Body>
            {/* Buttons for Student and Instructor */}
            {!showStudentSignUp && !showInstructorSignUp && (
              <Card.Body className="py-6 px-3">
                <div className="d-grid gap-4">
                  <Button
                    variant="primary"
                    onClick={handleShowStudentSignUp}
                    className=""
                  >
                    Job Seeker
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleShowInstructorSignUp}
                  >
                    Job Provider
                  </Button>
                </div>
              </Card.Body>
            )}
            {/* Student Sign-Up Form */}
            {showStudentSignUp && (
              <Fragment>
                <Button
                  variant="link"
                  className="button-back"
                  onClick={handleHideSignUpForms}
                >
                  &larr; Back
                </Button>
                <Card.Body className="py-6 px-3">
                  <StudentSignUp />
                </Card.Body>
              </Fragment>
            )}
            {/* Instructor Sign-Up Form */}
            {showInstructorSignUp && (
              <Fragment>
                <Button
                  variant="link"
                  className="button-back"
                  onClick={handleHideSignUpForms}
                >
                  &larr; Back
                </Button>
                <Card.Body className="py-6 px-3">
                  <InstructorSignUp />
                </Card.Body>
              </Fragment>
            )}
          </Col>
        </Col>
      </Row>
    </Fragment>
  );
};

export default SignUp;
