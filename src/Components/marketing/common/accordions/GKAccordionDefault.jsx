import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  ListGroup,
} from "react-bootstrap";

const GKAccordionDefault = ({ itemClass, courseData }) => {
  const ContextAwareToggle = ({ children, eventKey }) => {
    const { activeEventKey } = useContext(AccordionContext);
  
    const decoratedOnClick = useAccordionButton(
      eventKey,
      () => console.log("Accordion toggled") // Instead of using 'callback' which is not defined
    );
  
    const isCurrentEventKey = activeEventKey === eventKey;
  
    const handleClick = (e) => {
      e.preventDefault(); // Prevent the default behavior of the link
      decoratedOnClick(e); // Call the decoratedOnClick function to handle accordion state
    };

    return (
      <Fragment>
        <Link
          to="#"
          onClick={handleClick}
          aria-expanded={isCurrentEventKey}
          className="d-flex align-items-center text-inherit text-decoration-none h4 mb-0"
          data-bs-toggle="collapse"
          aria-controls="courseTwo"
        >
          <div className="me-auto">{children}</div>
          <span className="chevron-arrow ms-4">
            <i className="fe fe-chevron-down fs-4"></i>
          </span>
        </Link>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Accordion
        defaultActiveKey={
          courseData?.curriculum && courseData.curriculum.length > 0
            ? courseData.curriculum[0]._id
            : null
        }
      >
        <ListGroup as="ul" variant="flush">
          {courseData &&
            courseData.curriculum &&
            courseData.curriculum.map((item, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className={`${itemClass ? itemClass : ""}`}
                >
                  <ContextAwareToggle eventKey={item._id}>
                    {item && item.courseName ? item.courseName : ""}
                  </ContextAwareToggle>
                  <Accordion.Collapse eventKey={item._id}>
                    <ListGroup variant="flush">
                      <ListGroup.Item className="border-0 fs-5 px-0 py-4">
                        {item && item.description ? item.description : ""}
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Collapse>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Accordion>
    </Fragment>
  );
};

export default GKAccordionDefault;
