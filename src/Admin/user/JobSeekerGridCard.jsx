import React, { Fragment, useState, useEffect } from 'react';
import { Col, Card, Image, Row, Form } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { numberWithCommas } from '../../helper/utils';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const JobSeekersGridCard = ({ jobSeekers }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const jobSeekersPerPage = 8;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(false);
    }, []);

    const pagesVisited = pageNumber * jobSeekersPerPage;
    const pageCount = Math.ceil(jobSeekers.length / jobSeekersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const filteredJobSeekers = jobSeekers.filter(jobSeeker =>
        jobSeeker.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayJobSeekers = filteredJobSeekers
        .slice(pagesVisited, pagesVisited + jobSeekersPerPage)
        .map(jobSeeker => (
            <Col xl={3} lg={6} md={6} sm={12} key={jobSeeker.id}>
                <Card className="mb-5">
                    <Card.Body>
                        <div className="text-center">
                            <div className="position-relative">
                                <Image
                                    src={jobSeeker.imageUrl}
                                    className="rounded-circle avatar-xl mb-3"
                                    alt=""
                                />
                            </div>
                            <h4 className="mb-0">{jobSeeker.username}</h4>
                            {/* You can add other job seeker details here */}
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ));

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Fragment>
            <div className="mb-4">
                <Form.Control
                    type="search"
                    placeholder="Search Job Seekers"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <Row>
                {displayJobSeekers.length > 0 ? (
                    displayJobSeekers
                ) : (
                    <Col>No matching job seekers found.</Col>
                )}
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
    );
};

export default JobSeekersGridCard;
