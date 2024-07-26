// import node module libraries
import { Col, Row } from "react-bootstrap";

const HeroContent = () => {
  return (
    <Row>
      <Col lg={{ span: 8, offset: 2 }} md={12} sm={12} className="mb-12">
        {/* caption */}
        <h1 className="display-2 fw-bold mb-3">
          Bonjour, nous sommes{" "}
          <span className="text-primary">Unleashified</span>
        </h1>
        {/* para  */}
        <p className="h2 mb-3 ">
          Notre plateforme est conçue pour responsabiliser les particuliers et
          les entreprises en leur fournissant les outils, les ressources et les
          connexions dont ils ont besoin pour réussir sur le marché dynamique
          d’aujourd’hui. Nous croyons qu’il faut favoriser un environnement
          collaboratif où les idées naissent, les partenariats se forment et les
          rêves se réalisent.
        </p>
        <p className="mb-0 h4 text-body lh-lg">
          Nous créons une communauté dynamique qui favorise la croissance, la
          collaboration et l’innovation. Nous nous efforçons de combler le fossé
          entre les entrepreneurs, les utilisateurs, les fournisseurs de
          services et les demandeurs d’emploi en offrant une plateforme complète
          qui répond à leurs divers besoins.
        </p>
      </Col>
    </Row>
  );
};
export default HeroContent;
