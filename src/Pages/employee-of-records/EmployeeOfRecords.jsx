import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import HeroContent from "./HeroContent";

// import layouts
import NavbarJobPages from "../../Layout/navbars/NavbarJobPages";
import FooterWithLinks from "../home-academy/FooterWithLinks";
import Intro from "./Intro";
import Stat from "./Stat";
import Service from "./Service";
import CTA from "./CTA";


const EmployeeOfRecords = () => {
  return (
    <Fragment>
        <NavbarJobPages/>
        <main>
            <section>
            {/* <Container> */}
            {/* Hero Title */}
            <HeroContent />
            {/* </Container> */}
        </section>
        <section>
             {/* who we are section */}
            <Intro />
        </section>
        <section className="py-10 bg-white">
            <Container>
                {/* 4 Columns Stat */}
             <Stat />
            </Container>
        </section>
        <section>
            {/* Our service */}
            <Service />

            <CTA />
        </section>
        </main>
       <FooterWithLinks /> 
    </Fragment>
    
  )
}

export default EmployeeOfRecords