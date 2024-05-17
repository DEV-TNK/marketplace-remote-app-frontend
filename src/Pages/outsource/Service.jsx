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
    const description = `Our excellent outsourced customer service allows you to focus on growing your business.`;
    
    const features = [
      {
        id: 1,
        icon: <AiOutlineShop color="blue"/>,
        title: "E-commerce Support",
        description:
          "We acknowledge the pivotal role of administrative support in the development and success of the E-commerce business. Our expert team of skilled specialists renders effective administrative services with our in-place processes and tools needed to grow our partners’ business. Check out a case study about.",
      },
      {
        id: 2,
        icon: <TbDeviceAnalytics color="blue"/>,
        title: "SaaS Support",
        description:
          "Our technical support agents are helping SaaS companies scale efficiently with our omnichannel tech support platform that handles voice, digital, and chat support requests.",
      },
      {
        id: 3,
        icon: <GrServices color="blue"/>,
        title: "Tier 1-3 Omnichannel Support",
        description:
          "In today’s competitive, fast-paced market, keeping customers satisfied and happy ensures your business’s success. Our technical support specialists are equipped with comprehensive industry knowledge and exemplary people skills to handle even the most challenging situations. We can engage on any channel – voice, social, digital, chat.",
      },
      {
        id: 4,
        icon: <RiCustomerService2Line color="blue"/>,
        title: "Inbound Customer Service",
        description:
          "Companies that preferred high-touch engagements with their clients still choose phone support services. We can extend your service availability by taking care of your customers after hours and even during holidays with our omnichannel support services.",
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