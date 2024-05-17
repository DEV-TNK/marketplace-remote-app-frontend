// import node module libraries
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { FaNairaSign } from "react-icons/fa6";

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

const DashboardJobSingle = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const jobId = queryParam.get("id");

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
                  <div>
                    {/* bookmark */}
                    <GKTippy content="Add to Bookmarks">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-bookmark text-muted bookmark"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
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
                        <FaNairaSign style={{ height: "15px" }} />
                        <span className="ms-1 ">{jobDetails.jobSalary}</span>
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
            <div className="mt-5">
              {jobDetails.jobResponsibilities &&
              jobDetails.jobResponsibilities.length > 0 ? (
                <div>
                  <h3 className="fe-3">Responsibilities:</h3>
                  {jobDetails.jobResponsibilities.map((responsibility) => (
                    <li key={responsibility._id}>{responsibility.name}</li>
                  ))}
                </div>
              ) : (
                <p>No responsibilities specified</p>
              )}
            </div>
            <div className="mt-5">
              {jobDetails.desiredCandidate &&
              jobDetails.desiredCandidate.length > 0 ? (
                <div>
                  <h3 className="fe-3">Desired Candidate Profile:</h3>
                  {jobDetails.desiredCandidate.map((candidate) => (
                    <li key={candidate._id}>{candidate.name}</li>
                  ))}
                </div>
              ) : (
                <p>No Desired Candidate Profile</p>
              )}
            </div>
            <div className="mt-5">
              {jobDetails.jobPerksAndBenefits &&
              jobDetails.jobPerksAndBenefits.length > 0 ? (
                <div>
                  <h3 className="fe-3">Perks and Benefits:</h3>
                  {jobDetails.jobPerksAndBenefits.map((perk) => (
                    <li key={perk._id}>{perk.name}</li>
                  ))}
                </div>
              ) : (
                <p>No Perks and Benefits</p>
              )}
            </div>
          </Col>
        </Row>
        <Row></Row>
      </Container>
    </section>
  );
};

export default DashboardJobSingle;
