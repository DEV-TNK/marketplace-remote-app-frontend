// import node module libraries
import React, { Fragment, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Container, Nav, Navbar } from "react-bootstrap";
import { useGlobalContext } from "../context/AuthContext";
import axios from "axios";
import { showToast } from "../Components/Showtoast";

// import custom components
import ProfileCover from "../Components/marketing/common/headers/seekerProfileCover";

// import routes file
import {
  DashboardMenu,
  AccountSettingsMenu,
} from "../routes/marketing/DashboardRoutes";

import NavbarDefault from "../Pages/home-academy/navbars/NavbarDefault";

// import media files
import Avatar3 from "../assets/images/avatar/person.png";
import FooterWithLinks from "../Pages/home-academy/FooterWithLinks";
import NavbarJobPages from "../Layout/navbars/NavbarJobPages";

const ProfileLayout = (props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    user,
    userImage,
    userId,
    setUser,
    setUserRole,
    setUserImage,
    setUserId,
  } = useGlobalContext();
  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    const User = sessionStorage.getItem("username");
    const UserImage = sessionStorage.getItem("userImage");
    const UserId = sessionStorage.getItem("userId");

    if (User) setUser(User);
    if (userRole) setUserRole(userRole);
    if (UserImage) setUserImage(UserImage);
    if (UserId) setUserId(UserId);
  }, [setUser, setUserRole, setUserImage, setUserId]);

  const handleLogout = async () => {
    try {
      const response = await axios.delete(
        `https://marketplacebackendas-test.azurewebsites.net/api/v1/logout/${userId}`
      );
      showToast(response.data.message);
      sessionStorage.clear();
      navigate("/");
      setUser(null);
      setUserRole(null);
      setUserImage(null);
    } catch (error) {
      console.error("Error logging out:", error);
      showToast(error.response.message);
    }
  };

  const dashboardData = {
    avatar: userImage || Avatar3,
    name: user,
    username: `@${user}`,
    linkname: "mettre à jour le CV",
    link: "/jobs/update-resume/",
    verified: true,
    outlinebutton: false,
    level: "Beginner",
  };

  return (
    <Fragment>
      <NavbarJobPages />
      <section className="pt-5 pb-5">
        <Container>
          {/* User info */}
          <ProfileCover dashboardData={dashboardData} />

          {/* Content */}
          <Row className="mt-0 mt-md-4">
            <Col lg={3} md={4} sm={12}>
              <Navbar
                expand="lg"
                className="navbar navbar-expand-md navbar-light shadow-sm mb-4 mb-lg-0 sidenav"
              >
                <Link
                  className="btn btn-primary d-xl-none d-lg-none d-md-none text-inherit fw-bold fs-5 float-start py-1"
                  to="/jobs/update-resume/"
                >
                  Update Resume
                </Link>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="p-0 focus-none border-0"
                  label="Responsive Menu"
                >
                  <span
                    className="navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary p-0 text-white float-end"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidenav"
                    aria-controls="sidenav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="fe fe-menu"></span>
                  </span>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto flex-column" as="ul">
                    <Nav.Item className="navbar-header" as="li">
                    Tableau de bord
                    </Nav.Item>
                    {DashboardMenu.map((item, index) => (
                      <Nav.Item
                        as="li"
                        key={index}
                        className={`${
                          item.link === location.pathname ? "active" : ""
                        }`}
                      >
                        <Link className="nav-link" to={item.link}>
                          <i className={`fe fe-${item.icon} nav-icon`}></i>
                          {item.title}
                        </Link>
                      </Nav.Item>
                    ))}
                    <Nav.Item className="navbar-header mt-4" as="li">
                    PARAMÈTRES DU COMPTE
                    </Nav.Item>
                    {AccountSettingsMenu.map((item, index) => (
                      <Nav.Item
                        as="li"
                        key={index}
                        className={`${
                          item.link === location.pathname ? "active" : ""
                        }`}
                      >
                        {item.title === "Sign Out" ? (
                          <button className="nav-link" onClick={handleLogout}>
                            <i className={`fe fe-${item.icon} nav-icon`}></i>
                            {item.title}
                          </button>
                        ) : (
                          <Link className="nav-link" to={item.link}>
                            <i className={`fe fe-${item.icon} nav-icon`}></i>
                            {item.title}
                          </Link>
                        )}
                      </Nav.Item>
                    ))}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>

            <Col lg={9} md={8} sm={12}>
              {props.children}
            </Col>
          </Row>
        </Container>
      </section>
      <FooterWithLinks />
    </Fragment>
  );
};
export default ProfileLayout;
