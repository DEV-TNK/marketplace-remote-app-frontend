// Pagination.jsx
import React from 'react';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';

const Pagination = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Row>
      <Col lg={12} md={12} sm={12}>
        <div className="pb-5">
          <nav>
            <ListGroup
              as="ul"
              bsPrefix="pagination"
              className="justify-content-center mb-0"
            >
              <ListGroup.Item as="li" bsPrefix="page-item" className={currentPage === 1 ? 'disabled' : ''}>
                <Button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  className="page-link mx-1 rounded"
                >
                  <i className="fe fe-chevron-left"></i>
                </Button>
              </ListGroup.Item>
              {Array.from({ length: pageCount }, (_, index) => (
                <ListGroup.Item as="li" bsPrefix="page-item" key={index} className={currentPage === index + 1 ? 'active' : ''}>
                  <Button
                    onClick={() => paginate(index + 1)}
                    className="page-link mx-1 rounded"
                  >
                    {index + 1}
                  </Button>
                </ListGroup.Item>
              ))}
              <ListGroup.Item as="li" bsPrefix="page-item" className={currentPage === pageCount ? 'disabled' : ''}>
                <Button
                  disabled={currentPage === pageCount}
                  onClick={() => paginate(currentPage + 1)}
                  className="page-link mx-1 rounded"
                >
                  <i className="fe fe-chevron-right"></i>
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </nav>
        </div>
      </Col>
    </Row>
  );
};

export default Pagination;
