import React from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { Row, Col, Image, Dropdown } from "react-bootstrap";
import { useGlobalContext } from "../context/AuthContext";
import { showToast } from "../Components/Showtoast";
// const { LogOut } = useGlobalContext();

import Avatar1 from "../assets/images/avatar/avatar-1.jpg";

const QuickMenu = () => {
  const { user, userImage, LogOut } = useGlobalContext() || {}; // Ensure user and userImage are defined
  const Email = sessionStorage.getItem("email");
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  const handleSignOut = async () => {
    try {
      await LogOut();
    } catch (error) {
      showToast(error.response.data.message);
    }
  };

  return (
    <Fragment>
      <Dropdown as="li" className="ms-1">
        <Dropdown.Toggle
          as="a"
          bsPrefix=" "
          className="rounded-circle"
          id="dropdownUser"
        >
          <div className="avatar avatar-md avatar-indicators avatar-online">
            <Image
              alt="avatar"
              src={userImage || Avatar1}
              className="rounded-circle"
            />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu
          show={isDesktop ? true : false}
          className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
          aria-labelledby="dropdownUser"
          align="end"
        >
          <Dropdown.Item className="mt-3">
            <div className="d-flex">
              <div className="avatar avatar-md avatar-indicators avatar-online">
                <Image
                  alt="avatar"
                  src={userImage || Avatar1}
                  className="rounded-circle"
                />
              </div>
              <div className="ms-3 lh-1">
                <h5 className="mb-1">{user}</h5>
                <p className="mb-0 text-muted">{Email}</p>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className="mb-3" onClick={handleSignOut}>
            <i className="fe fe-power me-2"></i> Sign Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Fragment>
  );
};

export default QuickMenu;
