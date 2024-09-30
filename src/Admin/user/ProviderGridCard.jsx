// ProviderGridCard.jsx

import React, { Fragment, useState } from 'react';
import { Col, Card, Image, Row, Form } from 'react-bootstrap';
import { ChevronLeft, ChevronRight } from 'react-feather';
import ReactPaginate from 'react-paginate';

const ProviderGridCard = ({ jobProviders }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const providersPerPage = 8;

    const pagesVisited = pageNumber * providersPerPage;
    const pageCount = Math.ceil(jobProviders.length / providersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const filteredProviders = jobProviders.filter(provider =>
        provider.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const displayProviders = filteredProviders
        .slice(pagesVisited, pagesVisited + providersPerPage)
        .map(provider => (
            <Col xl={3} lg={6} md={6} sm={12} key={provider._id}>
                <Card className="mb-5">
                    <Card.Body>
                        <div className="text-center">
                            <div className="position-relative">
                                <Image
                                    src={provider.companyLogo}
                                    className="rounded-circle avatar-xl mb-3"
                                    alt={provider.companyName}
                                />
                            </div>
                            <h4 className="mb-0">{provider.companyName}</h4>
                            <p className="mb-0">{provider.companyLocation}</p>
                            <p className="mb-0">Industry: {provider.CompanyIndustry}</p>
                            <p className="mb-0">Sector: {provider.companyDesignation}</p>
                            <p className="mb-0">Type: {provider.companyType}</p>
                            <p className="mb-0">Contacts: {provider.companyEmail}, {provider.companyContact}</p>
                            <p className="mb-0">Total Jobs: {provider.totalJobs}</p>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        ));

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setPageNumber(0);
    };

    return (
        <Fragment>
            <div className="mb-4">
                <Form.Control
                    type="search"
                    placeholder="Recherche fournisseur d’emploi"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <Row>
                {displayProviders.length > 0 ? (
                    displayProviders
                ) : (
                    <Col>No matching job providers found.</Col>
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

export default ProviderGridCard;
