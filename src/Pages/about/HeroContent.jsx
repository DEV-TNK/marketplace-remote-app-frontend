// import node module libraries
import { Col, Row } from 'react-bootstrap';

const HeroContent = () => {
	return (
		<Row>
			<Col lg={{ span: 8, offset: 2 }} md={12} sm={12} className="mb-12">
				{/* caption */}
				<h1 className="display-2 fw-bold mb-3">
					Hi there, we’re <span className="text-primary">Unleashified</span>
				</h1>
				{/* para  */}
				<p className="h2 mb-3 ">
				Our platform is designed to empower individuals and businesses by providing them with the tools, resources, and connections they need to succeed in today's dynamic market. We believe in fostering a collaborative environment where ideas are born, partnerships are formed, and dreams are realized.
				</p>
				<p className="mb-0 h4 text-body lh-lg">
				We're creating a vibrant community that fosters growth, collaboration, and innovation. We strive to bridge the gap between entrepreneurs, users, service providers, and job seekers by offering a comprehensive platform that caters to their diverse needs.
				</p>
			</Col>
		</Row>
	);
};
export default HeroContent;
