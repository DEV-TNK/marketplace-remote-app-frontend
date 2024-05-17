// import node module libraries
import { Fragment, useEffect, useState } from "react";

// import custom components
import LogosTopHeadingOffset2 from "../Components/marketing/common/clientlogos/LogosTopHeadingOffset2";

// import sub components
import BrowseJobCategories from "./BrowseJobCategories";
import CustomerStories from "./CustomerStories";
import FindYourDreamJob from "./FindYourDreamJob";
import HowItWorks from "./Process";
import LatestJobOpening from "./LatestJobOpening";
import TopCompanies from "./TopCompanies";

// import data files
import LogoList2 from "../data/marketing/clientlogos/LogoList2";
import NavbarJobPages from "../Layout/navbars/NavbarJobPages";
import FooterWithLinks from "../Pages/home-academy/FooterWithLinks";
import FixRightPerson from "./FixRightPerson";
import PopularService from "./PopularService";
import axios from "axios";

const LandingJob = () => {
  const [id, setId] = useState(null);
  const [email, setEmail] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const userId = sessionStorage.getItem("UserId");
      if (userId) {
        setId(userId);
      } else {
        setId("");
      }
      const userEmail = sessionStorage.getItem("email");
      if (userEmail) {
        setEmail(userEmail);
      } else {
        setEmail("");
      }
      try {
        const response = await axios.post(
          "https://unleashified-backend.azurewebsites.net/api/v1/create-activity",
          {
            UserAction: "landing-Page",
            UserId: id,
            UserEmail: email,
            ActionType: "View-Page",
          }
        );
        console.log("this is the labding response", response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetch();
  }, []);
  return (
    <Fragment>
      <NavbarJobPages />
      {/* Find your dream job section */}

      <FindYourDreamJob />

      {/* Logos section  */}
      {/* <section className="py-8 bg-white">
        <LogosTopHeadingOffset2 limit={5} offset={1} logos={LogoList2} />
      </section> */}

      {/* <WorksForBuyer />
      <WorksForSeller /> */}

      <PopularService />

      {/* Latest Job Opening section */}
      <LatestJobOpening />

      <FixRightPerson />

      {/* How It Works section */}
      <HowItWorks />

      {/* Browse Category section */}
      <BrowseJobCategories />

      {/* Customer stories section */}
      <CustomerStories />

      {/* Top companies hiring section */}
      <TopCompanies />

      <FooterWithLinks />
    </Fragment>
  );
};

export default LandingJob;
