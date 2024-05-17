// import node module libraries
import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Accordion,
  useAccordionButton,
  AccordionContext,
  ListGroup,
  ProgressBar,
} from "react-bootstrap";

// import MDI icons
import Icon from "@mdi/react";
import { mdiPlay } from "@mdi/js";

const GKAccordionProgress = ({ courseData }) => {
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
         onClick={handleClick}
          aria-expanded={isCurrentEventKey}
          className="h4 mb-0 d-flex align-items-center text-inherit text-decoration-none py-3 px-4 collapsed "
          data-bs-toggle="collapse"
          role="button"
          aria-controls="courseTwo"
        >
          <div className="me-auto">{children}</div>
          <div></div>
          <span className="chevron-arrow ms-4">
            <i className="fe fe-chevron-down fs-4"></i>
          </span>
        </Link>
      </Fragment>
    );
  };

  return (
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
              <ListGroup.Item key={index} as="li" className="p-0">
                <ContextAwareToggle eventKey={item._id}>
                  {item && item.courseName ? item.courseName : ""}
                </ContextAwareToggle>
                <Accordion.Collapse eventKey={item._id}>
                  <ListGroup variant="flush">
                    <ListGroup.Item className="fs-5 rounded-3">
                      {item && item.description ? item.description : ""}
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Collapse>
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </Accordion>
  );
};

export default GKAccordionProgress;
