// import node module libraries
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Image,
  Navbar,
  Nav,
  Container,
  Form,
  NavbarCollapse,
  NavDropdown,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useGlobalContext } from "../../../context/AuthContext";

// import sub layout components
// import NavDropdownMain from "../navbars/NavDropdownMain";
import QuickMenu from "../../../Layout/QuickMenu";
import DarkLightMode from "../../../Layout/DarkLightMode";
import { useNavigate } from "react-router-dom";

// import media files
import Logo from "../../../assets/images/brand/logo/logo.png";
import Logo2 from "../../../assets/unleashified-logo.png";

// import data files
import NavbarDefaultRoutes from "../../../routes/NavbarDefault";

import "./navbarDefault.css";
import NavbarDropdown from "./NavbarDropdown";

const NavbarDefault = ({ headerstyle, login }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  const { user, userRole } = useGlobalContext();
  const navigate = useNavigate();

  const redirect = async () => {
    if (userRole === "student") {
      navigate("/student-My-Course");
    }
    if (userRole === "instructor") {
      navigate("/Instructordashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className="navbar p-6 navbar-default py-2"
      >
        <Container fluid className="px-0 ps-2">
          {/* <Navbar.Brand as={Link} to="/"> */}
          <Link to={redirect} onClick={redirect}>
            <Image
              src={Logo2}
              alt="logo"
              style={{ height: "56px", width: "80px", cursor: "pointer" }}
              // onClick={redirect}
            />
          </Link>

          {/* </Navbar.Brand> */}
          <div
            className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${
              login ? (isDesktop || isLaptop ? "d-none" : "d-flex") : "d-none"
            }`}
          >
            <QuickMenu />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Nav className="mx-10 gap-lg-5  ">
              {/* {NavbarDefaultRoutes.map((item, index) => {
                if (item.children === undefined) {
                  return (
                    <Nav.Link key={index} as={Link} to={item.link}>
                      {item.menuitem}
                    </Nav.Link>
                  );
                }
                
              })} */}

              <ul>
              {NavbarDefaultRoutes.map((item, index) => {
                if (item.menuitem === "Home") {
                  // Dynamically set the home link based on login status
                  const homeLink = user ? "/student" : "/";
                  return (
                    <li key={index}>
                    <Nav.Link as={Link} to={item.link}>
                      {item.menuitem}
                    </Nav.Link>
                  </li>
                  );
                } else {
                  return (
                    <li key={index}>
                    <Nav.Link as={Link} to={item.link}>
                      {item.menuitem}
                    </Nav.Link>
                  </li>
                  );
                }
              })}

               {/* Add the NavbarDropdown component here
            <li className="navbar-item">
              <NavbarDropdown />
            </li> */}
              </ul>
            </Nav>
          </Navbar.Collapse>

          {/* start here */}
          <Navbar.Collapse className="justify-content-end">
            <Nav className="navbar-nav navbar-right-wrap d-flex nav-top-wrap"></Nav>

            <Nav className="navbar-nav navbar-right-wrap d-flex nav-top-wrap">
              {/* Dark Mode component */}
              <DarkLightMode className="mt-2 me-2" />

              {/* If user is logged in, show Dashboard link */}
              {user ? (
                <Nav.Link
                  // as={Link}
                  // to="/dashboard"
                  bsPrefix="btn"
                  className="btn btn-primary shadow-sm"
                  onClick={redirect}
                >
                  Dashboard
                </Nav.Link>
              ) : (
                // If user is not logged in, show Sign In and Sign Up links
                <span className={`ms-auto mt-1`}>
                  <Nav.Link
                    as={Link}
                    to="/authentication/signin"
                    bsPrefix="btn"
                    className="btn btn-white shadow-sm me-2"
                  >
                    Sign In
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/authentication/signup"
                    bsPrefix="btn"
                    className="btn btn-primary shadow-sm"
                  >
                    Sign Up
                  </Nav.Link>
                </span>
              )}

              {/* Other components... */}
            </Nav>
            {/* end of right side quick / shortcut menu  */}
          </Navbar.Collapse>
          {/* end here */}
        </Container>
      </Navbar>
    </Fragment>
  );
};

// Specifies the default values for props
NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
  login: false,
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
  headerstyle: PropTypes.string,
  login: PropTypes.bool,
};

export default NavbarDefault;
