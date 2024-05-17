// import node module libraries
import { Fragment } from "react";

// import sub components
import HeaderBreadcrumb from "../HeaderBreadcrumb";
import SupportForm from "../help-center-support/SupportForm";
import NavbarDefault from "../../../../../Pages/home-academy/navbars/NavbarDefault";
import FooterWithLinks from "../../../../../Pages/home-academy/FooterWithLinks";


const HelpCenterSupport = () => {
  const breadcrumb = [
    {
      page: "Help Center",
      link: "/marketing/help-center/",
    },
    {
      page: "Support",
      link: "/help-and-support",
    },
  ];

  return (
    <>
      <NavbarDefault />
      <Fragment>
        {/* header and breadcrumb */}
        <HeaderBreadcrumb title="Support" breadcrumb={breadcrumb} />

        {/* support form  */}
        <SupportForm />
      </Fragment>
      <FooterWithLinks />
    </>
  );
};
export default HelpCenterSupport;
