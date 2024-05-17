// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import custom components
import FeatureLeftIcon from '../../Components/marketing/common/features/FeatureLeftIcon';

const FeaturesList = () => {
	const features = [
		{
			id: 1,
			title: '2,000+ online jobs',
			description: 'Explore a diverse range of relevant subjects catered to both job seekers and providers.',
			icon: 'video',
			colorclass: 'warning'
		},
		{
			id: 2,
			title: 'Expert job providers',
			description: 'Discover skilled professionals to meet your job needs.',
			icon: 'users',
			colorclass: 'warning'
		},
		{
			id: 3,
			title: 'Lifetime access',
			description: 'Receive job opportunities at your convenience.',
			icon: 'clock',
			colorclass: 'warning'
		}
	];
	return (
		<section className="bg-white py-4 shadow-sm">
			<Container>
				<Row className="align-items-center g-0">
					{features.map((item, index) => {
						return (
							<Col xl={4} lg={4} md={6} className="mb-lg-0 mb-4" key={index}>
								<FeatureLeftIcon item={item} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</section>
	);
};
export default FeaturesList;
