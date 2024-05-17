import React from "react";
import CourseSlider from "./Slider";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const PopularService = () => {
  // Define the popular courses data
  const popularCourses = [
    {
      title: "Mobile Development",
      description: "Build mobile apps for iOS and Android platforms.",
    },
    {
      title: "Digital Marketing",
      description: "Promote products or services using digital technologies.",
      image: "digital-marketing-image-url.jpg",
    },
    {
      title: "Web Development",
      description: "Create websites and web applications for various purposes.",
      image: "web-development-image-url.jpg",
    },
    {
      title: "Graphic Design",
      description:
        "Learn to create visual content for websites, advertisements, and more.",
      image: "graphic-design-image-url.jpg",
    },
    {
      title: "Data Science",
      description: "Explore data analysis and machine learning techniques.",
      image: "data-science-image-url.jpg",
    },
    {
      title: "Photography",
      description: "Master the art of capturing stunning photographs.",
      image: "photography-image-url.jpg",
    },
    {
      title: "Project Management",
      description:
        "Learn effective project planning, execution, and management strategies.",
      image: "project-management-image-url.jpg",
    },
    {
      title: "UI/UX Design",
      description:
        "Design user-friendly interfaces and enhance user experience.",
      image: "ui-ux-design-image-url.jpg",
    },
    {
      title: "Blockchain Development",
      description:
        "Explore blockchain technology and develop decentralized applications.",
      image: "blockchain-development-image-url.jpg",
    },
    {
      title: "Artificial Intelligence",
      description:
        "Discover AI concepts and techniques for problem-solving and automation.",
      image: "artificial-intelligence-image-url.jpg",
    },
    // Add more courses as needed
  ];

  // Return the PopularService component
  return (
    <section className="pt-lg-12 pb-lg-3 pt-8 pb-6 bg-white">
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 className="mb-0 mx-2">Popular Services</h2>
          </Col>
        </Row>
        <div className="position-relative">
          <CourseSlider popular={popularCourses} />
        </div>
        <Col sm={12} className="mt-8 text-center">
          <Link to="/jobs/services-list">
            <Button>Browser All Services</Button>
          </Link>
        </Col>
      </Container>
    </section>
  );
};

export default PopularService;
