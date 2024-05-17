// import node module libraries
import { Row, Col, Container, Button, Image, Modal } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { showToast } from "../../../../Showtoast";

import { FaNairaSign } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";

// import sub components
import JobListingListviewCard from "../../../../../Components/marketing/common/cards/JobListingListviewCard";
import GKTippy from "../../../../../Components/elements/tooltips/GKTippy";

// import data files
import JobsListingData from "../../../../../data/marketing/jobs/JobsListingData";
import { useEffect, useState } from "react";
import axios from "axios";

function getTimeDifference(updatedAt) {
  // Parse the updatedAt string to a Date object
  const updatedAtDate = new Date(updatedAt);

  // Get the current time
  const currentTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentTime - updatedAtDate;

  // Convert milliseconds to minutes
  const minutes = Math.floor(timeDifference / (1000 * 60));

  // Convert minutes to hours
  const hours = Math.floor(minutes / 60);

  // Convert hours to days
  const days = Math.floor(hours / 24);

  return { days, hours: hours % 24, minutes: minutes % 60 };
}

const JobSingle = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const jobId = queryParam.get("id");
  const [showFallback, setShowFallback] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const userRole = sessionStorage.getItem("role");
    if (userRole === "provider") {
      setShow(false);
    }
  }, []);

  const url = window.location.href;

  useEffect(() => {
    const getAJob = async () => {
      try {
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-a-job/${jobId}`
        );
        setJobDetails(response.data.requiredJob);
      } catch (error) {
        console.log(error);
      }
    };
    getAJob();
  }, []);

  const getTimeDifferenceString = (time) => {
    if (time.days > 0) {
      return `${time.days} days ago`;
    } else if (time.hours > 0) {
      return `${time.hours} hours ago`;
    } else {
      return `${time.minutes} minutes ago`;
    }
  };

  const time = getTimeDifference(jobDetails.updatedAt);
  const timeString = getTimeDifferenceString(time);

  const accessToken = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleApplyClick = () => {
    if (!accessToken) {
      // Save current URL in sessionStorage

      sessionStorage.setItem("redirectSeekerUrl", `/jobs/listing/?id=${jobId}`);

      // Redirect to login page
      navigate("/authentication/signin");
    } else {
      // Proceed with the action
      navigate(`/jobs/apply-for-this-job/?id=${jobId}`);
    }
  };

  const handleSaveJobClick = async () => {
    try {
      if (!accessToken) {
        sessionStorage.setItem(
          "redirectSeekerUrl",
          `/jobs/listing/?id=${jobId}`
        );
        navigate("/authentication/signin");
      } else {
        const userId = sessionStorage.getItem("UserId");
        if (!userId) {
          console.error("User ID not found in sessionStorage.");
          navigate("/authentication/signin");
          return;
        }
        const response = await axios.post(
          `https://unleashified-backend.azurewebsites.net/api/v1/save-job/${jobId}`,
          { userId }
        );
        if (
          response.status === 404 ||
          response.status === 500 ||
          response.status === 401 ||
          response.status === 503
        ) {
          showToast(response.data.message);
          navigate(`/jobs/apply-for-this-job/?id=${jobId}`);
        } else if (response.status === 200) {
          showToast(response.data.message);
          navigate("/jobs/listing/job-list");
        }
      }
    } catch (error) {
      console.error("Error saving job:", error);
      showToast(
        error.response?.data?.message ||
          "An error occurred while saving the job."
      );
    }
  };

  // to share job

  const handleShare = async () => {
    try {
      // Check if Web Share API is supported by the browser
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: url,
        });
        console.log("Page shared successfully");
      } else {
        console.log("coming here");
        // Show fallback for browsers that don't support Web Share API
        setShowFallback(true);
      }
    } catch (error) {
      console.error("Error sharing page:", error);
    }
  };

  const handleCopy = () => {
    // Copy the URL to the clipboard
    navigator.clipboard.writeText(url);
  };

  const formatPrice = (currencyName, priceValue) => {
    switch (currencyName) {
      case "naira":
      case "NGN":
        return `₦${priceValue}`;
      case "dollars":
      case "USD":
        return `$${priceValue}`;
      case "euros":
      case "EUR":
        return `€${priceValue}`;
      case "pounds":
      case "GBP":
        return `£${priceValue}`;
      default:
        return `₦${priceValue}`;
    }
  };
  return (
    <section className="py-14 bg-white">
      <Container>
        <Row>
          <Col xl={{ span: 8, offset: 2 }} md={12}>
            <div className="d-xl-flex ">
              <div className="mb-3 mb-md-0">
                {jobDetails.jobPoster && jobDetails.jobPoster.companyLogo && (
                  <Image
                    src={jobDetails.jobPoster.companyLogo}
                    alt="logo"
                    className="icon-shape border rounded-circle"
                    style={{ height: "100px", width: "120px" }}
                  />
                )}
              </div>

              {/* text */}
              <div className="ms-xl-3  w-100 mt-3 mt-xl-0">
                <div className="d-flex justify-content-between mb-5">
                  <div>
                    <h1 className="mb-1 h2 ">{jobDetails.jobTitle}</h1>

                    <div>
                      {jobDetails.jobPoster &&
                        jobDetails.jobPoster.companyName && (
                          <span>at {jobDetails.jobPoster.companyName} </span>
                        )}
                    </div>
                  </div>
                  <div onClick={handleShare}>
                    {/* bookmark */}
                    <GKTippy content="Share Job Post">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        // width="100"
                        // height="100"
                        width="24"
                        height="24"
                        // viewBox="0 0 16 16"
                        viewBox="0 0 24 24"
                      >
                        <path d="M 18 2 A 3 3 0 0 0 15 5 A 3 3 0 0 0 15.054688 5.5605469 L 7.9394531 9.7109375 A 3 3 0 0 0 6 9 A 3 3 0 0 0 3 12 A 3 3 0 0 0 6 15 A 3 3 0 0 0 7.9355469 14.287109 L 15.054688 18.439453 A 3 3 0 0 0 15 19 A 3 3 0 0 0 18 22 A 3 3 0 0 0 21 19 A 3 3 0 0 0 18 16 A 3 3 0 0 0 16.0625 16.712891 L 8.9453125 12.560547 A 3 3 0 0 0 9 12 A 3 3 0 0 0 8.9453125 11.439453 L 16.060547 7.2890625 A 3 3 0 0 0 18 8 A 3 3 0 0 0 21 5 A 3 3 0 0 0 18 2 z"></path>
                      </svg>
                    </GKTippy>
                  </div>
                </div>
                <div>
                  {/* year */}
                  <div className="d-md-flex justify-content-between ">
                    <div className="mb-2 mb-md-0">
                      <span className="me-2">
                        {" "}
                        <i className="fe fe-briefcase text-muted"></i>
                        <span className="ms-1 ">
                          {jobDetails.jobFormat} Job
                        </span>
                      </span>
                      {/* text */}

                      <span className="me-2">
                        {/* <FaNairaSign style={{ height: "15px" }} /> */}
                        <span className="ms-1 ">
                          {formatPrice(
                            jobDetails.currency,
                            jobDetails.jobSalary
                          )}
                        </span>
                      </span>
                      <span className="me-2">
                        <span className="ms-1 ">
                          {jobDetails.jobSalaryFormat} Payment
                        </span>
                      </span>
                      {/* location */}
                      <span className="me-2">
                        <i className="fe fe-map-pin text-muted"></i>
                        <span className="ms-1 ">{jobDetails.jobLocation}</span>
                      </span>
                    </div>
                    <div>
                      {/* time */}
                      <i className="fe fe-clock text-muted"></i>{" "}
                      <span>{timeString}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <p>
                <span>
                  Job Applicants:{" "}
                  <span className="text-dark">{jobDetails.jobApplicants}</span>
                </span>
              </p>
            </div>
            {/* <div
              dangerouslySetInnerHTML={{
                __html: job.jobDetails,
              }}
            /> */}
            {/* button */}
            <div className="mt-5">
              <h1 className="fs-3">Job description</h1>
              <p>{jobDetails.jobDescription}</p>
            </div>
            <div className="mt-5">
              <h1 className="fs-3">Role</h1>
              <p>{jobDetails.jobRoles}</p>
            </div>
            <div className="mt-5">
              <h1 className="fs-3">Experience</h1>
              <span className="">
                <span className="">
                  {Array.isArray(jobDetails.jobExperience) ? (
                    <ul>
                      {jobDetails.jobExperience.map((experience, index) => (
                        <li key={index}>{experience.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <span>No job experience available</span>
                  )}
                </span>
              </span>
            </div>
            <div className="mt-2">
              <h3 className="fe-3">Responsibilities:</h3>
              {jobDetails.jobResponsibilities &&
              jobDetails.jobResponsibilities.length > 0 ? (
                <div>
                  {jobDetails.jobResponsibilities.map((responsibility) => (
                    <li key={responsibility._id}>{responsibility.name}</li>
                  ))}
                </div>
              ) : (
                <p>No responsibilities specified</p>
              )}
            </div>
            <div className="mt-5">
              <h3 className="fe-3">Desired Candidate Profile:</h3>
              {jobDetails.desiredCandidate &&
              jobDetails.desiredCandidate.length > 0 ? (
                <div>
                  {jobDetails.desiredCandidate.map((candidate) => (
                    <li key={candidate._id}>{candidate.name}</li>
                  ))}
                </div>
              ) : (
                <p>No Desired Candidate Profile </p>
              )}
            </div>
            <div className="mt-5">
              <h3 className="fe-3">Perks and Benefits:</h3>
              {jobDetails.jobPerksAndBenefits &&
              jobDetails.jobPerksAndBenefits.length > 0 ? (
                <div>
                  {jobDetails.jobPerksAndBenefits.map((perk) => (
                    <li key={perk._id}>{perk.name}</li>
                  ))}
                </div>
              ) : (
                <p>No Perks and Benefits</p>
              )}
            </div>

            <div className="mt-5 d-lg-flex flex-lg-row flex-column gap-5">
              {show && (
                <Button
                  type="button"
                  variant="primary"
                  onClick={handleApplyClick}
                  className="w-100"
                >
                  Apply for this Job
                </Button>
              )}
              {show && (
                <Button
                  type="button"
                  variant="success"
                  onClick={handleSaveJobClick}
                  className="w-100 mt-3 mt-lg-0 "
                >
                  Save this Job
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          {/* <Col xl={{ span: 8, offset: 2 }} md={12}>
            <div className="mt-12">
              <h2 className="mb-4">Similar Jobs</h2>
              {similarJobs.map((job, index) => {
                return <JobListingListviewCard item={job} key={index} />;
              })}
            </div>
          </Col> */}
        </Row>
        {showFallback && (
          <Modal show={showFallback} onHide={() => setShowFallback(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Copy Job Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input type="text" value={url} readOnly /> <br />
              <Button className="mt-5 " onClick={handleCopy}>
                Copy
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowFallback(false)}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Container>
    </section>
  );
};

export default JobSingle;

// <div>
//   <p>Browser does not support sharing.</p>
//   <p>Copy the URL:</p>
//   <input type="text" value={url} readOnly />
//   <button onClick={handleCopy}>Copy</button>
// </div>
