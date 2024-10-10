import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, Row, Navbar } from "react-bootstrap";
import Logo2 from "../assets/unleashified-logo.png";
import Logo from "../assets/LogoList/cote-logo.png";
import StudentSignUp from "./signupforms/JobSeeker";
import InstructorSignUp from "./signupforms/Provider";
import "./signupforms/signup.css"; // Import your CSS file
import NavbarDefault from "../Pages/home-academy/navbars/NavbarDefault";
import { FaRegBuilding } from "react-icons/fa6";
import { FiBriefcase } from "react-icons/fi";
import { GrBusinessService } from "react-icons/gr";
import { MdOutlineBusiness } from "react-icons/md";
import { IoBusinessSharp } from "react-icons/io5";
import ServiceProviderSignUp from "./signupforms/ServiceProvider";

const SignUp = () => {
  // State to manage which sign-up form to display
  const [showStudentSignUp, setShowStudentSignUp] = useState(false);
  const [showInstructorSignUp, setShowInstructorSignUp] = useState(false);
  const [showServiceProviderSignUp, setShowServiceProviderSignUp] =
    useState(false);

  // Function to handle showing student sign-up form
  const handleShowStudentSignUp = () => {
    setShowStudentSignUp(true);
    setShowInstructorSignUp(false);
    setShowServiceProviderSignUp(false);
  };

  // Function to handle showing instructor sign-up form
  const handleShowInstructorSignUp = () => {
    setShowStudentSignUp(false);
    setShowInstructorSignUp(true);
    setShowServiceProviderSignUp(false);
  };

  // Functioon to handle showing seeker provider
  const handleShowServiceProviderSignUp = () => {
    setShowInstructorSignUp(false);
    setShowStudentSignUp(false);
    setShowServiceProviderSignUp(true);
  };

  // Function to handle hiding sign-up forms
  const handleHideSignUpForms = () => {
    setShowStudentSignUp(false);
    setShowInstructorSignUp(false);
    setShowServiceProviderSignUp(false);
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
                <h1 className="mb-1 fw-bold">S’enregistrer</h1>
                <span>
                  Vous avez déjà un compte ?{" "}
                  <Link to="/authentication/signin" className="ms-1">
                    Connexion
                  </Link>
                </span>
              </div>
            </Card.Body>
            {/* Buttons for Student and Instructor */}
            {!showStudentSignUp &&
              !showInstructorSignUp &&
              !showServiceProviderSignUp && (
                <Card.Body className="py-4 px-3">
                  <div className="d-grid">
                    <Row className="mb-3">
                      <Col>
                        <Card className="mt-4">
                          <Card.Body className="text-center">
                            <FiBriefcase size={50} className="mb-2" />
                            <p className="small mb-2">
                              Trouvez votre prochaine opportunité d'emploi{" "}
                            </p>
                            <Button
                              variant="primary"
                              onClick={handleShowStudentSignUp}
                            >
                              Rechercheur d'emploi
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="mt-4">
                          <Card.Body className="text-center">
                            <IoBusinessSharp size={50} className="mb-2" />
                            <p className="small mb-2">
                              Publiez des offres d'emploi et trouvez des
                              candidats
                            </p>
                            <Button
                              variant="primary"
                              onClick={handleShowInstructorSignUp}
                            >
                              Fournisseur d'emploi
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Card className="mt-4">
                          <Card.Body className="text-center">
                            <GrBusinessService size={50} className="mb-2" />
                            <p className="small mb-2">
                              Trouvez les services dont vous avez besoin
                            </p>
                            <Button
                              variant="primary"
                              onClick={handleShowServiceProviderSignUp}
                            >
                              Demandeur de services
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col>
                        <Card className="mt-4">
                          <Card.Body className="text-center">
                            <MdOutlineBusiness size={50} className="mb-2" />
                            <p className="small mb-2">Offrez vos services</p>
                            <Button
                              variant="primary"
                              onClick={handleShowServiceProviderSignUp}
                            >
                              Prestataire de services
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
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
                  &larr; Précédent
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
                  &larr; Précédent
                </Button>
                <Card.Body className="py-6 px-3">
                  <InstructorSignUp />
                </Card.Body>
              </Fragment>
            )}
            {/* Service Provider Sign-Up Form */}
            {showServiceProviderSignUp && (
              <Fragment>
                <Button
                  variant="link"
                  className="button-back"
                  onClick={handleHideSignUpForms}
                >
                  &larr; Back
                </Button>
                <Card.Body className="py-6 px-3">
                  <ServiceProviderSignUp />
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
