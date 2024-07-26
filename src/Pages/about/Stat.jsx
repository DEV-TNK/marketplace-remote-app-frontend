// import node module libraries
import { Fragment } from "react";
import { Col, Row } from "react-bootstrap";

// import sub components
import SectionHeading from "./SectionHeading";

const Stat = () => {
  const title = "Nos valeurs fondamentales";
  const description = ` Nous faisons innover l’avenir de l’emploi en mettant en relation les fournisseurs de service avec des opportunités qui correspondent à leurs compétences et à leurs aspirations, Unleashified permet aux individus de s’épanouir dans leur carrière tout en aidant les entreprises à trouver les bons talents pour réussir.`;

  const counters = [
    {
      id: 1,
      title: "DEMANDEURS D'EMPLOIS",
      value: "220 000",
    },
    {
      id: 2,
      title: "RECRUTEURS",
      value: "150 000",
    },
    {
      id: 3,
      title: "EMPLOIS DISPONIBLES",
      value: "10 000",
    },
    {
      id: 4,
      title: "TOTAL TRANSACTION",
      value: "2 000",
    },
  ];
  return (
    <Fragment>
      <SectionHeading title={title} description={description} />
      <Row>
        {counters.map((item, index) => {
          return (
            <Col lg={3} md={6} sm={6} xs={6} key={index}>
              {/* Counter */}
              <div className="border-top pt-4 mt-6 mb-5">
                <h1 className="display-3 fw-bold mb-0">{item.value}</h1>
                <p className="text-uppercase text-muted">{item.title}</p>
              </div>
            </Col>
          );
        })}
      </Row>
    </Fragment>
  );
};

export default Stat;
