import React, { useState, useEffect, Fragment } from 'react';
import { Col, Card, Image, Row, Form, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const StudentsGridCard = ({ students }) => {
    const [pageNumber, setPageNumber] = useState(0);
    const [loading, setLoading] = useState(true); // Add loading state
    const studentsPerPage = 9;
    const pagesVisited = pageNumber * studentsPerPage;
    const pageCount = Math.ceil(students.length / studentsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Simulate fetching data (replace setTimeout with actual data fetching)
        const fetchData = () => {
            setTimeout(() => {
                setLoading(false); // Set loading to false after data fetching
            }, 2000); // Simulate 2 seconds loading time
        };

        fetchData();
    }, []); // Empty dependency array to run effect only once on component mount

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayStudents = filteredStudents
        .slice(pagesVisited, pagesVisited + studentsPerPage)
        .map((student) => {
            const courseTitlesTooltip = (
                <Tooltip id={`tooltip-${student.id}`}>
                    {student.courseTitles.map((course, index) => (
                        <span key={index}>{course}<br/></span>
                    ))}
                </Tooltip>
            );

            return (
                <Col xl={4} lg={4} md={6} sm={12} key={student.id}>
                    <Card className="mb-4">
                        <Card.Body>
                            <div className="text-center">
                                <Image src={student.image} className="rounded-circle avatar-xl mb-3" alt="" />
                                <h4 className="mb-1">{student.name}</h4>
                                <p className="mb-0 fs-6">
                                    <i className="fe fe-map-pin me-1"></i>
                                    {student.locations} {student.state}, {student.country} 
                                </p>
                               
                            </div>
                            <div className="d-flex justify-content-between border-bottom py-2 mt-4 fs-6">
                                <span>Total Enrolled Courses</span>
                                <span className="text-dark">{student.totalCourses}</span>
                            </div>
                            <div className="d-flex justify-content-between pt-2 fs-6 align-items-center">
                                <span>Course Title's</span>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={courseTitlesTooltip}
                                >
                                    <Link
                                        to="#"
                                        className="btn btn-sm btn-outline-primary mt-3"
                                        style={{ backgroundColor: 'white', color: 'black' }}
                                    >
                                        View
                                    </Link>
                                </OverlayTrigger>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            );
        });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setPageNumber(0); // Reset pagination when searching
    };

    return (
        <Fragment>
            <Row>
                <Col xl={12} lg={12} sm={12} className="mb-3">
                    <Row>
                        <Col className="pe-0">
                            <Form.Group className="mb-3" controlId="formSearchbyName">
                                <Form.Control
                                    placeholder="Search by Name"
                                    type="search"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {loading ? ( // Show spinner while loading
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <Fragment>
                    <Row>
                        {displayStudents.length > 0 ? displayStudents : <Col>No matching students found.</Col>}
                    </Row>
                    <ReactPaginate
                        previousLabel={<ChevronLeft size="14px" />}
                        nextLabel={<ChevronRight size="14px" />}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={'justify-content-center mb-0 pagination'}
                        previousLinkClassName={'page-link mx-1 rounded'}
                        nextLinkClassName={'page-link mx-1 rounded'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link mx-1 rounded'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={'active'}
                    />
                </Fragment>
            )}
        </Fragment>
    );
};

export default StudentsGridCard;
