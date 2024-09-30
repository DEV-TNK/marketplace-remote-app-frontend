// import node module libraries
import { Col, Row, Container } from 'react-bootstrap';

// import custom components
import FeatureLeftIcon from '../../Components/marketing/common/features/FeatureLeftIcon';

const FeaturesList = () => {
	const features = [
		{
			id: 1,
			title: 'Plus de 2 000 emplois en ligne',
			description: 'Explorez un large éventail de sujets pertinents destinés à la fois aux demandeurs d’emploi et aux fournisseurs.',
			icon: 'video',
			colorclass: 'warning'
		},
		{
			id: 2,
			title: 'Fournisseurs d’emplois experts',
			description: 'Découvrez des professionnels qualifiés pour répondre à vos besoins.',
			icon: 'users',
			colorclass: 'warning'
		},
		{
			id: 3,
			title: 'Accès à vie',
			description: 'Recevez des offres d’emploi à votre convenance.',
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
