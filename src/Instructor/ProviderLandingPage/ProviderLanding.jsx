import React, { Fragment } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import CourseSlider from './CourseSlider';
import FeaturesList from './FeaturesList';
import HeroHeader from './HeroHeader';
import NavbarDefault from '../../Layout/navbars/NavbarJobPages';
import FooterWithLinks from '../../Pages/home-academy/FooterWithLinks';
import TopCompanies from '../../landing-job/TopCompanies';

const ProviderLanding = () => {
   
    return (
        <Fragment>
            <NavbarDefault />
            <HeroHeader />
            <FeaturesList />
            
            <section className="pt-lg-12 pb-lg-3 pt-8 pb-6">
				<Container>
					<Row className="mb-4">
						<Col>
							<h2 className="mb-0 mx-2">Recommended to you</h2>
						</Col>
					</Row>
					<div className="position-relative">
						<CourseSlider recommended={true} />
					</div>
				</Container>
			</section>
          
            {/* <section className="pb-lg-3 pt-lg-3">
                <Container>
                    <Row className="mb-4">
                        <Col>
                            <h2 className="mb-0 mx-2">Most Popular</h2>
                        </Col>
                    </Row>
                    <div className="position-relative">
                        <CourseSlider popular={true} />
                    </div>
                </Container>
            </section> */}
            {/* <section className="pb-lg-8 pt-lg-3 py-6">
                <Container>
                    <Row className="mb-4">
                        <Col>
                            <h2 className="mb-0 mx-2">Trending</h2>
                        </Col>
                    </Row>
                    <div className="position-relative">
                        <CourseSlider trending={true} />
                    </div>
                </Container>
            </section> */}

            <TopCompanies />

          <FooterWithLinks />
        </Fragment>
    );
};

export default ProviderLanding;
