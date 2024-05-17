import { Col, Row, Container, Image, Button } from "react-bootstrap";

// import sub components
import JobSearchBox from "../Components/marketing/common/jobs/JobSearchBox";

// import media files
import JobHeroSection from "../assets/images/job/hero-1.png";
import JobHeroSection2 from "../assets/images/job/hero-2.png";
import JobHeroSection3 from "../assets/images/job/hero-3.png";

// import JobHeroSection from "../assets/images/job/png/job-hero-section.png";
import JobHeroBlock1 from "../assets/images/job/job-hero-block-1.svg";
// import { ReactComponent as JobHeroBlock1 } from "../assets/images/job/job-hero-block-1.svg";
import JobHeroBlock2 from "../assets/images/job/job-hero-block-2.svg";
import JobHeroBlock3 from "../assets/images/job/job-hero-block-3.svg";
import serviceCreate from "../assets/images/job/service-create.png";
import serviceOrder from "../assets/images/job/service-order.svg";
import serviceApply from "../assets/images/job/service-apply.svg";
import outSource from "../assets/images/job/new-outsource.png";
import payment from "../assets/images/job/new-hero-2.svg";
import team from "../assets/images/job/getTeam.svg";

import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Slider.css";

const FindYourDreamJob = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <section className=" slider">
      <Slider {...settings}>
        <div className="bg-warning-subtle py-lg-14 py-12 px-12 bg-cover ">
          <Row className="align-items-center">
            <Col lg={6} sm={12}>
              <div>
                <div className=" text-center text-md-start ">
                  {/* heading */}
                  <h1 className=" display-2 fw-bold  mb-3">
                    Find your dream job that you love to do.
                  </h1>
                  {/* lead */}
                  <p className="lead">
                    The largest remote work community in the world. Sign up and
                    post a job or create your developer profile.
                  </p>
                </div>
                <div className="mt-0">
                  {/* job search form */}
                  {/* <JobSearchBox /> */}
                  {/* text */}
                  <span className=" fs-4">
                    Listed over 10k jobs from 150k+ Job provider
                  </span>
                </div>
                <Link to="/jobs/listing/job-list">
                  <Button className="mt-5">Start Applying</Button>
                </Link>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} sm={12} className="text-center">
              <div className="position-relative ">
                <Image src={JobHeroSection} className="img-fluid " />
                <div className="position-absolute top-0 mt-7 ms-n6 ms-md-n6 ms-lg-n12 start-0">
                  {/* <img src={JobHeroBlock1} alt="" className=" size" /> */}
                  <Image src={JobHeroBlock1} className=" " />
                </div>
                <div className="position-absolute bottom-0 mb-12 me-n6 me-md-n4 me-lg-n12 end-0 ">
                  <Image src={JobHeroBlock2} className="img-fluid " />
                </div>
                <div className="position-absolute bottom-0 mb-n4 ms-n1 ms-md-n4 ms-lg-n7 start-0">
                  <Image src={JobHeroBlock3} className="img-fluid " />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bg-primary py-lg-14 py-12 px-12 bg-cover">
          <Row className="align-items-center">
            <Col lg={6} sm={12}>
              <div>
                <div className=" text-center text-md-start ">
                  {/* heading */}
                  <h1 className=" display-2 fw-bold  mb-3 text-light">
                    Find Services that meet your needs.
                  </h1>
                  {/* lead */}
                  <p className="lead text-light">
                    Join our vibrant community to offer your services or find
                    the perfect service for your needs
                  </p>
                </div>
                <div className="mt-0">
                  {/* job search form */}
                  {/* <JobSearchBox /> */}
                  {/* text */}
                  <span className=" fs-4 text-light">
                    Listed over 10k services from 150k+ Service provider
                  </span>
                </div>
                <Link to="/jobs/services-list">
                  <Button className="mt-5 btn-light">Find Services</Button>
                </Link>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} sm={12} className="text-center">
              <div className="position-relative ">
                <Image src={JobHeroSection2} className="img-fluid " />
                <div className="position-absolute top-0 mt-7 ms-n6 ms-md-n6 ms-lg-n12 start-0">
                  <Image src={serviceApply} className="size " />
                </div>
                <div className="position-absolute bottom-0 mb-12  end-0  ">
                  <Image src={serviceOrder} className="size" />
                </div>
                <div className="position-absolute bottom-0 mb-n4 ms-n1 ms-md-n4 ms-lg-n7 start-0">
                  <Image src={serviceCreate} className="size " />
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="bg-success py-lg-14 py-12 px-12 bg-cover">
          <Row className="align-items-center">
            <Col lg={6} sm={12}>
              <div>
                <div className=" text-center text-md-start ">
                  {/* heading */}
                  <h1 className=" display-2 fw-bold  mb-3 text-light">
                    Find the perfect match for your project needs!
                  </h1>
                  {/* lead */}
                  <p className="lead text-light">
                    Join our platform to outsource jobs to us and we help
                    interview, conduct tests, and get the best talents to fill
                    your outsourced positions.
                  </p>
                </div>
                <div className="mt-0">
                  {/* job search form */}
                  {/* <JobSearchBox /> */}
                  {/* text */}
                  <span className=" fs-4 text-light">
                    Trusted by over 150+ company to organize team
                  </span>
                </div>
                <Link to="/jobs/outsource/">
                  {/* /authentication/signin */}
                  <Button className="mt-5 btn-light">Out-Source Jobs</Button>
                </Link>
              </div>
            </Col>
            <Col lg={{ span: 5, offset: 1 }} sm={12} className="text-center">
              <div className="position-relative ">
                <Image src={JobHeroSection3} className="img-fluid " />
                <div className="position-absolute top-0 mt-7 ms-n6 ms-md-n6 ms-lg-n12 start-0">
                  <Image src={team} className="size " />
                </div>
                <div className="position-absolute bottom-0 mb-12  end-0 ">
                  <Image src={payment} className="size " />
                </div>
                <div className="position-absolute bottom-0 mb-n4 ms-n1 ms-md-n4 ms-lg-n7 start-0">
                  <Image src={outSource} className="size " />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Slider>
    </section>
  );
};

export default FindYourDreamJob;
