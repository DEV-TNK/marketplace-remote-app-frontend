// import node module libraries
import React from 'react';
import { Row, Col, Button, ListGroup } from 'react-bootstrap';

const Pagination = ({ table }) => {
  // Check if table object and methods exist before accessing them
  const pageCount = table ? table.getPageCount() : 0;
  const pageIndex = table && table.options.state.pagination ? table.options.state.pagination.pageIndex : 0;

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
              <ListGroup.Item as="li" bsPrefix="page-item" className={!table || !table.getCanPreviousPage ? 'disabled' : ''}>
                <Button
                  disabled={!table || !table.getCanPreviousPage()}
                  onClick={() => table.previousPage()}
                  className="page-link mx-1 rounded"
                >
                  <i className="fe fe-chevron-left"></i>
                </Button>
              </ListGroup.Item>
              {Array.from(Array(pageCount).keys()).map((page, index) => (
                <ListGroup.Item as="li" bsPrefix="page-item" key={index} className={pageIndex === page ? 'active' : ''}>
                  <Button
                    onClick={() => table.setPageIndex(page)}
                    className="page-link mx-1 rounded"
                  >
                    {page + 1}
                  </Button>
                </ListGroup.Item>
              ))}
              <ListGroup.Item as="li" bsPrefix="page-item" className={!table || !table.getCanNextPage ? 'disabled' : ''}>
                <Button
                  disabled={!table || !table.getCanNextPage()}
                  onClick={() => table.nextPage()}
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
