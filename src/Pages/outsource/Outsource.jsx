import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import HeroContent from "./HeroContent";

// import layouts
import NavbarJobPages from "../../Layout/navbars/NavbarJobPages";
import FooterWithLinks from "../home-academy/FooterWithLinks";
import Intro from "./Intro";
import Stat from "../about/Stat";
import Service from "./Service";
import OutsourceCTA from "./OutsourceCTA";


const Outsource = () => {
  return (
    <Fragment>
        <main>
            <section className="py-10 bg-white">
            <Container>
            {/* Hero Title */}
            <HeroContent />
            </Container>
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

            <OutsourceCTA />
        </section>
        </main>
        
    </Fragment>
    
  )
}

export default Outsource