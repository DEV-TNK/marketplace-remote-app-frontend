import { v4 as uuid } from "uuid";

const NavbarDefault = [
  // {
  //   id: uuid(),
  //   menuitem: "Home",
  //   link: "/",
  // },
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
  {
    id: uuid(),
    menuitem: "Companies",
    link: "/jobs/company-list",
  },
  // {
  //   id: uuid(),
  //   menuitem: "About Us",
  //   link: "/aboutus",
  // },
  {
    id: uuid(),
    menuitem: "Pricing",
    link: "/pricing",
  },
  // {
  //   id: uuid(),
  //   menuitem: "Contact-Us",
  //   link: "/contactUs",
  // },
];

export default NavbarDefault;
