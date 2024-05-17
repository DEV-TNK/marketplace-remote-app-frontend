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
  const title = "Our Mission";
  const description = `We are committed to providing a user-friendly, secure, and inclusive platform that empowers our community members to achieve their goals and aspirations.`;

  const features = [
    {
      id: 1,
      icon: mdiSchoolOutline,
      title: "Smart Job Matches",
      description:
        "Our advanced job matching engine connects job seekers with relevant opportunities based on their skills, experience, and preferences. Say goodbye to endless job searches and hello to personalized job recommendations.",
    },
    {
      id: 2,
      icon: mdiAccountGroup,
      title: "Job Opportunities",
      description:
        "Connecting job seekers with job providers is our mission. We provide a seamless platform for finding employment opportunities and building meaningful careers.",
    },
    {
      id: 3,
      icon: mdiFinance,
      title: "Entrepreneurship Support",
      description:
        "For aspiring entrepreneurs, we offer resources, mentorship, and guidance. Our platform fosters innovation and helps turn ideas into successful ventures.",
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
