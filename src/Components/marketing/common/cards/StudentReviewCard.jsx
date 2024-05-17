import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import Ratings from "../ratings/Ratings";

const InstructorReviewCard = ({ item }) => {
  // Check if item.userImage exists before accessing it
  const userImageSrc = item.userImage || ""; // Provide a default value if userImage is undefined

  return (
    <div className="d-flex">
      <Image src={userImageSrc} alt="" className="rounded-circle avatar-lg" />
      <div className="ms-3 mt-2">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h4 className="mb-0">{item.user}</h4>
          </div>
          {/* <div>
            <OverlayTrigger
              key="top"
              placement="top"
              overlay={<Tooltip id={`tooltip-top`}>Report Abuse</Tooltip>}
            >
              <Link
                to="#"
                data-bs-toggle="tooltip"
                data-placement="top"
                title="Report Abuse"
              >
                <i className="fe fe-flag"></i>
              </Link>
            </OverlayTrigger>
          </div> */}
        </div>
        <div className="mt-2">
          <span className="me-1 text-warning">
            <Ratings rating={item.rating} />
          </span>
          <span className="me-1">for</span>
          <span className="h5">{item.courseTitle}</span>
          <p className="mt-2">{item.review}</p>
          {/* <Link to="#" className="btn btn-outline-secondary btn-sm">
            Respond
          </Link> */}
        </div>
      </div>
    </div>
  );
};

InstructorReviewCard.propTypes = {
  item: PropTypes.shape({
    userImage: PropTypes.string, // No longer marked as required
    user: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    courseTitle: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
  }).isRequired,
};

export default InstructorReviewCard;
