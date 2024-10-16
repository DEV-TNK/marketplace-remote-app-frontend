import { Link } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import FAQsData from "../../data/marketing/compare-plans/FAQsData";
import NavbarJobsPages from "../../Layout/navbars/NavbarJobPages";
import FooterWithLinks from "../home-academy/FooterWithLinks";

const FAQs = () => {
  return (
    <>
     <NavbarJobsPages />
      <section className="pb-14 pt-lg-8 bg-white">
        <Container>
          <Row className="align-items-center"> 
            <Col xl={6} lg={10} xs={12}>
              <div className="mb-8 pe-8">
                {/* heading */}
                <h1 className="display-4 fw-bold mb-4">
                Foire aux questions, 

                  <span className="text-primary">réponses.</span>
                </h1>
                {/* para */}
                <p className="fs-4">
                D’autres questions ? Consultez le 
                {" "}
                  <Link to="/marketing/help-center/">centre d’aide.</Link>
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            {/* FAQs  */}
            {FAQsData.map((item, index) => {
              return (
                <Col md={6} xs={12} key={index}>
                  <div className="mb-6 pe-lg-8">
                    <h3 className="mb-2">{item.question}</h3>
                    <p className="fs-4">{item.answer}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
      <FooterWithLinks />
    </>
  );
};

export default FAQs;
