// Section: Features
// Style: Three Columns Features Section

// Import node module libraries
import { Col, Row, Container } from "react-bootstrap";

// Import MDI icons
import { mdiSchoolOutline, mdiAccountGroup, mdiFinance } from "@mdi/js";

// Import custom components
import FeatureTopIconCard from "../../Components/marketing/common/features/FeatureTopIconCard";

// Import sub components
import SectionHeading from "./SectionHeading";

const Features3Columns = () => {
  const title = "Notre mission";
  const description = `Nous sommes engagés à fournir une plateforme conviviale, sécurisée et inclusive qui permet aux membres de notre communauté d’atteindre leurs objectifs et leurs aspirations.`;

  const features = [
    {
      id: 1,
      icon: mdiSchoolOutline,
      title: "Correspondances d’emplois intelligentes",
      description:
        "Notre moteur de correspondance d’emploi avancé met en relation les demandeurs d’emploi avec des opportunités pertinentes en fonction de leurs compétences, de leur expérience et de leurs préférences. Dites adieu aux recherches d’emploi interminables et bonjour aux recommandations d’emploi personnalisées.",
    },
    {
      id: 2,
      icon: mdiAccountGroup,
      title: "Opportunités d’emploi",
      description:
        "Mettre en relation les demandeurs d’emploi avec les recruteurs est notre mission. Nous fournissons une plateforme transparente pour trouver des opportunités d’emploi et construire des carrières significatives.",
    },
    {
      id: 3,
      icon: mdiFinance,
      title: "Soutien à l’entrepreneuriat",
      description:
        "Pour les nouveaux entrepreneurs, nous offrons des ressources, du mentorat et des conseils. Notre plateforme favorise l’innovation et aide à transformer les idées en entreprises réussies.",
    },
  ];

  return (
    <section className="py-lg-16 py-10">
      <Container>
        <SectionHeading title={title} description={description} />
        <Row>
          {features.map((item, index) => {
            return (
              <Col md={4} sm={12} key={index}>
                <FeatureTopIconCard item={item} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Features3Columns;
