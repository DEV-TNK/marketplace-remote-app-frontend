// import node module libraries
import { Link } from "react-router-dom";
import { Col, Row, Image } from "react-bootstrap";

// import MDI icons
import Icon from "@mdi/react";
import { mdiFacebook, mdiTwitter, mdiLinkedin } from "@mdi/js";

// import BS icons
import { Telephone, EnvelopeOpen, GeoAlt } from "react-bootstrap-icons";

// import sub components
import ContactForm from "./ContactForm";

import NavbarJobsPages from "../../Layout/navbars/NavbarJobPages";
import FooterWithLinks from "../home-academy/FooterWithLinks";

const Contact = () => {
  return (
    <main>
      <NavbarJobsPages />
      <section className="container-fluid bg-white">
        <Row className="align-items-center pt-10 min-vh-100">
          <Col lg={6} md={12} sm={12}>
            <div className="px-xl-20 px-md-8 px-4 py-8 ">
              {/* content */}

              <div className="text-dark">
                <h1 className="display-4 fw-bold">Get In Touch.</h1>
                <p className="lead text-dark">
                  Fill in the form to the right to get in touch with someone on
                  our team, and we will reach out shortly.
                </p>
                <div className="mt-8">
                  {/* <p className="fs-4 mb-4">
                    If you are seeking support please visit our
                    <Link to="/support">support portal</Link> before reaching
                    out directly.
                  </p> */}

                  <p className="fs-4">
                    <EnvelopeOpen size={16} className="text-primary me-2" />{" "}
                    info@unleashified.com
                  </p>
                  <p className="fs-4 ">
                    <GeoAlt size={17} className="text-primary me-2" />
                    GetFundedAfrica
                    <br />
                    3rd Floor, Unit 1110, Ogun State Technology Hub, Abeokuta,
                    <br />
                    Ogun State, Nigeria.
                  </p>
                </div>

                {/* social media */}
                <div className="mt-10">
                  <a
                    href="https://www.linkedin.com/company/gfa-technologies/mycompany/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "10px" }}
                  >
                    <Icon path={mdiLinkedin} size={1} />
                  </a>
                  {/*Facebook*/}
                  <a
                    href="https://web.facebook.com/getfundedafricaoffical?_rdc=1&_rdr"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "10px" }}
                  >
                    <Icon path={mdiFacebook} size={1} />
                  </a>
                  {/*Twitter*/}
                  <a
                    href="https://twitter.com/gfunded_africa"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: "10px" }}
                  >
                    <Icon path={mdiTwitter} size={1} />
                  </a>
                </div>
              </div>
            </div>
          </Col>

          {/* right side form section with background color */}
          <Col
            lg={6}
            className="d-lg-flex align-items-center w-lg-50 min-vh-lg-100 position-fixed-lg bg-cover bg-light top-0 right-0"
          >
            <ContactForm />
          </Col>
        </Row>
      </section>
      <FooterWithLinks />
    </main>
  );
};

export default Contact;
