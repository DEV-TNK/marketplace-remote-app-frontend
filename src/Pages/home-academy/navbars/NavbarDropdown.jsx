import React, { useState } from "react";
import "./navbarDefault.css";
import { v4 as uuid } from 'uuid'; // Import uuid for generating unique IDs


const NavbarDropdown = () => {
  const navdata = [
    {
      id: uuid(),
      menuitem: "Jobs",
      link: "/jobs/listing/job-list",
    },
    {
      id: uuid(),
      menuitem: "Services",
      link: "/jobs/services-list",
    },
    {
      id: uuid(),
      menuitem: "Outsource",
      link: "/jobs/outsource/",
    },
  ];

  // const navdata = [
  //     {
  //         id: uuid(),
  //         menuitem: "Resources",
  //         submenu: [
  //           {
  //             id: uuid(),
  //             label: "Jobs",
  //             link: "/jobs/listing/job-list",
  //           },
  //           {
  //             id: uuid(),
  //             label: "Services",
  //             link: "/jobs/services-list",
  //           },
  //           {
  //             id: uuid(),
  //             label: "Outsource",
  //             link: "/jobs/outsource/",
  //           },
  //         ],
  //       },
  // ]

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Function to toggle dropdown state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to close dropdown when mouse leaves
  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav>
      {/* Navbar items */}
      <ul className="navbar-items">
        <li
          className="navbar-item"
          onMouseEnter={toggleDropdown}
          onMouseLeave={closeDropdown}
        >
          Resources
          {/* Dropdown content */}
          {isDropdownOpen && (
            <div className="dropdown-content">
              {/* Iterate through navdata to generate dropdown items */}
              {navdata.map(item => (
                <a key={item.id} href={item.link}>
                  <p>{item.menuitem}</p>
                </a>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavbarDropdown