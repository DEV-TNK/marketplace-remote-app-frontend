// Section: Features
// Style: Three Columns Features Section

// Import node module libraries
import { Col, Row, Container, Card } from "react-bootstrap";

//import react icons
import { RiCustomerService2Line } from "react-icons/ri";
import { GrServices } from "react-icons/gr";
import { TbDeviceAnalytics } from "react-icons/tb";
import { AiOutlineShop } from "react-icons/ai";

const Service = () => {
    const title = "Our Services";
    const description = `we offer a comprehensive suite of services designed to streamline your hiring process and connect you with the best talent. Here’s how we can help your organization`;
    
    const features = [
      {
        id: 1,
        icon: <AiOutlineShop color="blue"/>,
        title: "Talent Sourcing",
        description:
          "Our team of experienced recruiters utilizes advanced sourcing techniques and an extensive network to find candidates that perfectly match your job requirements. Whether you need specialized professionals or general support staff, we have the resources to identify the right talent.",
      },
      {
        id: 2,
        icon: <TbDeviceAnalytics color="blue"/>,
        title: "Customized Recruitment Solutions",
        description:
          "We understand that every organization is unique. That’s why we tailor our recruitment solutions to meet your specific needs. From crafting precise job descriptions to targeting the right candidate pools, we ensure a personalized approach to each search.",
      },
      {
        id: 3,
        icon: <GrServices color="blue"/>,
        title: "Continuous Support and Follow-up",
        description:
          "Our commitment to your satisfaction doesn’t end with hiring. We offer ongoing support and follow-up to ensure the success and retention of new employees. We check in regularly to address any concerns and provide additional resources if needed.",
      },
      {
        id: 4,
        icon: <RiCustomerService2Line color="blue"/>,
        title: "Specialized Industry Expertise",
        description:
          "Our team has deep expertise in a wide range of industries, allowing us to provide insights and advice tailored to your specific sector. Whether you’re in technology, healthcare, finance, or any other field, we understand the unique challenges and requirements of your industry.",
      },
    ];
  
    return (
      <section className="py-lg-16 py-10">
        <Container>
        <Row className="text-center justify-content-center text-center mb-6">
			<Col md={6} sm={12}>
				<h2 className="display-4 mb-3 fw-bold">{title}</h2>
				<p className="lead">{description}</p>
			</Col>
		</Row>
          <Row className="justify-content-center">
            {features.map((item, index) => {
              return (
                <Col md={3} sm={12} key={index} className="mb-3">
                 <Card className="mb-4 h-100">
                    <Card.Body className="p-4 py-2">
                        <div className="mb-3 text-center" style={{ fontSize: '3rem' }}>
                            {item.icon} 
                        </div>
                        <h3 className="mb-2 text-center">{item.title}</h3>
                        <p className="mb-0 text-center">{item.description}</p>
                    </Card.Body>
                 </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    );
  };
  

export default Service