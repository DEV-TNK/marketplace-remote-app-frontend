import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image, Navbar, Nav, Container } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useGlobalContext } from "../../context/AuthContext";
import QuickMenu from "../../Layout/QuickMenu";
import DarkLightMode from "../../Layout/DarkLightMode";
import { useNavigate } from "react-router-dom";

// import media files
// import Logo from "../../assets/unleashified-logo.png";
import Logo from "../../assets/LogoList/cote-logo.png";

// import data files
import NavbarDefaultRoutes from "../../routes/NavbarDefault";

const NavbarDefault = ({ headerstyle, login }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  const { user, userRole } = useGlobalContext() || {}; // Ensure user and userRole are defined
  const navigate = useNavigate();

  const redirect = async () => {
    if (userRole === "seeker") {
      navigate("/JobSeekerdashboard");
    }
    if (userRole === "provider") {
      navigate("/Providerdashboard");
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
          <Link to={redirect} onClick={redirect}>
            <Image
              src={Logo}
              alt="logo"
              style={{ height: "56px", width: "88px", cursor: "pointer" }}
            />
          </Link>

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
              {NavbarDefaultRoutes.map((item, index) => {
                if (item.menuitem === "Home") {
                  const role = sessionStorage.getItem("role");
                  const homeLink = role === "seeker" ? "/Jobseeker" : "/";
                  return (
                    <Nav.Link key={index} as={Link} to={homeLink}>
                      {item.menuitem}
                    </Nav.Link>
                  );
                } else {
                  return (
                    <Nav.Link key={index} as={Link} to={item.link}>
                      {item.menuitem}
                    </Nav.Link>
                  );
                }
              })}
            </Nav>
          </Navbar.Collapse>

          <Navbar.Collapse className="justify-content-end">
            <Nav className="navbar-nav navbar-right-wrap d-flex nav-top-wrap">
              <DarkLightMode className="mt-2 me-2" />

              {user ? (
                <Nav.Link
                  bsPrefix="btn"
                  className="btn btn-primary shadow-sm"
                  onClick={redirect}
                >
                  Dashboard
                </Nav.Link>
              ) : (
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
  login: false,
};

NavbarDefault.propTypes = {
  headerstyle: PropTypes.string,
  login: PropTypes.bool,
};

export default NavbarDefault;
