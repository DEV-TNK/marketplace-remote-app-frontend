import { Col, Row, Container, Button, Image } from "react-bootstrap";
import LandingTwo from "../assets/images/brand/landing-2.jpg";

const WorksForBuyer = () => {
  return (
    <section className="py-lg-10 pt-8 py-10 bg-light">
      <Container>
        <Row className="text-center">
          <Col md={12} className="px-lg-10 mb-4 mt-2">
            <span className="text-uppercase text-primary fw-semi-bold ls-md">
              HOW DOES IT WORK FOR Job Seekers?
            </span>
            <h2 className="h1 fw-bold mt-3">Are You Seeking Employment Opportunities?</h2>
          </Col>
        </Row>
        <Row>
          {/* Left Section with Image */}
          <Col xl={4} md={12} xs={12}>
            {/* Use Image component from react-bootstrap */}
            <Image src={LandingTwo} alt="landingtwo" fluid />
          </Col>
          {/* Right Section */}
          <Col xl={8} md={12} xs={12}>
            <Row>
              {/* Card 1 */}
              <Col md={6} sm={12}>
                <div
                  className="text-center p-3 rounded card-bordered  card-hover cursor-pointer "
                  style={{
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {/* Removed process-line class */}
                  <div className="icon-shape icon-lg fs-3 rounded-circle mb-4 text-primary smooth-shadow-md card-bordered  card-hover cursor-pointer">
                    1
                  </div>
                  <p className="mb-4">Find a service that you need.</p>
                  <h4>
                  As a job seeker, you're essentially shopping for a service – finding suitable employment. This involves researching job openings, networking, and using job search platforms to align with your career goals. Much like comparing prices and portfolios to find the best seller, job seekers compare opportunities, company cultures, and benefits to find the perfect fit. If you have questions, don't hesitate to reach out to potential employers for clarification.
                  </h4>
                </div>
              </Col>
              {/* Card 2 */}
              <Col md={6} sm={12}>
                <div
                  className="text-center p-3 rounded card-bordered  card-hover cursor-pointer"
                  style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* Removed process-line class */}
                  <div className="icon-shape icon-lg fs-3 rounded-circle mb-4 text-primary smooth-shadow-md card-bordered  card-hover cursor-pointer">
                    2
                  </div>
                  <p className="mb-4">Supply your brief</p>
                  <h4>
                  Once you've identified a job opportunity that matches your qualifications and interests, the next step is to supply your brief. This involves submitting your resume, cover letter, and any other required application materials to the prospective employer. Your brief serves as a snapshot of your professional background, showcasing your relevant skills, experiences, and achievements to demonstrate why you are a suitable candidate for the position.
                  </h4>
                </div>
              </Col>
            </Row>
            <Row>
              {/* Card 3 */}
              <Col md={6} sm={12}>
                <div
                  className="text-center p-3 rounded card-bordered  card-hover cursor-pointer"
                  style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* Removed process-line class */}
                  <div className="icon-shape icon-lg fs-3 rounded-circle mb-4 text-primary smooth-shadow-md card-bordered  card-hover cursor-pointer">
                    3
                  </div>
                  <p className="mb-4">Manage Transaction</p>
                  <h4>
                  Throughout the job application process, managing transactions effectively is crucial. This includes communicating with hiring managers or recruiters, scheduling interviews, and following up on application statuses. Additionally, if offered the position, managing the transaction involves negotiating terms of employment, reviewing contracts, and ensuring a smooth transition into the new role.
                  </h4>
                </div>
              </Col>
              {/* Card 4 */}
              <Col md={6} sm={12}>
                <div
                  className="text-center p-3 rounded card-bordered  card-hover cursor-pointer"
                  style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
                >
                  {/* Removed process-line class */}
                  <div className="icon-shape icon-lg fs-3 rounded-circle mb-4 text-primary smooth-shadow-md card-bordered  card-hover cursor-pointer">
                    4
                  </div>
                  <p className="mb-4">Approve service delivered</p>
                  <h4>
                  Once you've secured employment and are satisfied with the opportunity provided by the employer, it's similar to marking the transaction complete in a service scenario. You essentially approve the service delivered by accepting the job offer and fulfilling any pre-employment requirements. Just as leaving feedback helps the community in service transactions, continuously evaluating your satisfaction with the role and organization ensures it aligns with your career goals and expectations.
                  </h4>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default WorksForBuyer;
