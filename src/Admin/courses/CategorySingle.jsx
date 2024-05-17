import React, { Fragment, useMemo, useState, useEffect } from 'react';
import { Col, Row, Card, Breadcrumb, Spinner } from 'react-bootstrap';
import TanstackTable from '../../Components/elements/advance-table/TanstackTable';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CategorySingle = () => {
    const [jobCategories, setJobCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search);
    const jobTitleEncoded = queryParam.get("name");
    const jobTitle = decodeURIComponent(jobTitleEncoded);

    useEffect(() => {
        const fetchAJob = async () => {
            try {
                const response = await axios.get(`https://unleashified-backend.azurewebsites.net/api/v1/admin-categorySingle/${jobTitle}`);
                setJobCategories(response.data.categorySingle);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching category jobs:', error);
                setLoading(false);
            }
        };

        fetchAJob();
    }, []);

    const formatDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = dateTime.toLocaleDateString('en-US', options);
        const day = dateTime.getDate();
        const suffix = ['st', 'nd', 'rd'][((day + 90) % 100 - 10) % 10 - 1] || 'th';
        const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedTime = dateTime.toLocaleTimeString('en-US', timeOptions);
        return `${formattedDate.replace(/\b(\d{1,2})\b/g, `$1${suffix}`)} at ${formattedTime}`;
    };

    const columns = useMemo(
        () => [
            { accessorKey: 'jobTitle', header: 'Job Title',
                cell: ({ row }) => (
                    <button className="job-title-button">{row.original.jobTitle}</button>
                ),
            },
            { accessorKey: 'createdAt', header: 'Date Added',
                cell: ({ row }) => (
                    <span>{formatDate(row.original.createdAt)}</span>
                ),
            },
            { accessorKey: 'jobApplicants', header: 'Number of Applicants' },
            { accessorKey: 'jobSalary', header: 'Job Salary' }
        ],
        []
    );

    const data = useMemo(() => jobCategories, [jobCategories]);

    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">
                                {jobTitle}
                                <span className="fs-5">
                                    ({jobCategories.length} Course&apos;s)
                                </span>{" "}
                            </h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Category</Breadcrumb.Item>
                                <Breadcrumb.Item active></Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <button
                                className="btn btn-outline-secondary"
                                data-bs-toggle="modal"
                                data-bs-target="#newCategory"
                            >
                                Back to All Categories
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Card>
                        <Card.Body className="p-0">
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <TanstackTable
                                    data={data}
                                    columns={columns}
                                    filter={true}
                                    filterPlaceholder="Search Course"
                                    pagination={true}
                                />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    );
};

export default CategorySingle;
