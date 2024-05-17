import { Link } from "react-router-dom";
import { Image, Card, Badge, Row, Col } from "react-bootstrap";
import Ratings from "../../common/ratings/Ratings";
import { numberWithCommas } from "../../../../helper/utils";
import "./GetEnrollCourseCard.css";

const GetEnrolledCourseCard = ({ item }) => {
  const badgeBG = () => {
    switch (item.level) {
      case "Intermediate":
        return "info-soft";
      case "Beginner":
        return "success-soft";
      case "Advance":
        return "danger-soft";
      default:
        return "primary-soft";
    }
  };

  return (
    <Card className="mb-4 card-hover shadow-lg course-card ">
      <Link to="#" className="card-img-top">
        <div className="h-25">
          <Image
            src={item.image}
            alt="image"
            className="card-img-top rounded-top-md"
            style={{ maxHeight: "200px", width: "100%", objectFit: "cover" }}
          />
        </div>
      </Link>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge bg={badgeBG()}>{item.level}</Badge>
          <Link to="#" className="text-muted fs-5">
            <i className="fe fe-heart align-middle"></i>
          </Link>
        </div>
        <h4 className="mb-2 text-truncate-line-2">
          <Link to="/student/single-course" className="text-inherit">
            {item.title}
          </Link>
        </h4>
        <small>By: {item.Agent ? item.Agent.username : "Unknown"}</small>
        <div className="lh-1 mt-3">
          {item.rating && ( // Check if rating exists
            <span className="text-warning me-1">
              <Ratings rating={item.rating} />
            </span>
          )}
          {item.rating && ( // Check if rating exists
            <span className="text-warning me-1">{item.rating.toFixed(1)}</span>
          )}
          {item.ratingby && ( // Check if ratingby exists
            <span className="fs-6 text-muted">
              ({numberWithCommas(item.ratingby)})
            </span>
          )}
        </div>
      </Card.Body>
      <Card.Footer>
        <Row className="align-items-center g-0">
          <Col className="col">
            <h5 className="mb-0">₦{item.price}</h5>
          </Col>
          <Col xs="auto">
            <Link to="#" className="text-inherit">
              <i className="fe fe-shopping-cart text-primary align-middle me-2"></i>
              Get Enrolled
            </Link>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default GetEnrolledCourseCard;
