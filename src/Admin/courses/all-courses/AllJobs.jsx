import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Tab, Card, Nav, Breadcrumb, Spinner } from 'react-bootstrap';
import axios from 'axios';
import JobsTable from '../all-courses/JobsTable';
import { showToast } from '../../../Components/Showtoast';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    const day = date.getDate();
    const suffix = ['st', 'nd', 'rd'][((day + 90) % 100 - 10) % 10 - 1] || 'th';
    return formattedDate.replace(/\b(\d{1,2})\b/g, `$1${suffix}`);
};

const formatTime = (timeString) => {
    const time = new Date(timeString);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return time.toLocaleTimeString('en-US', options);
};

const AllJobs = () => {
    const [allJobs, setAllJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [ongoingJobs, setOngoingJobs] = useState([]);
    const [completedJobs, setCompletedJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const responseAll = await axios.get('https://unleashified-backend.azurewebsites.net/api/v1/admin-all-job');
                const responseOngoing = await axios.get('https://unleashified-backend.azurewebsites.net/api/v1/admin-jobs-ongoing');
                const responseCompleted = await axios.get('https://unleashified-backend.azurewebsites.net/api/v1/admin-jobs-completed');
                if (Array.isArray(responseAll.data.jobs)) {
                    setAllJobs(responseAll.data.jobs);
                } else {
                    setError("Data received is not an array");
                }
                if (Array.isArray(responseOngoing.data.Ongoing)) {
                    setOngoingJobs(responseOngoing.data.Ongoing);
                } else {
                    setError("Ongoing data received is not an array");
                }
                if (Array.isArray(responseCompleted.data.completed)) {
                    setCompletedJobs(responseCompleted.data.completed);
                } else {
                    setError("Completed data received is not an array");
                }
            } catch (error) {
                setError(error.message);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
    };

    const getJobsByTab = (tabName) => {
        switch (tabName) {
            case 'all':
                return allJobs;
            case 'ongoing':
                return ongoingJobs;
            case 'completed':
                return completedJobs;
            default:
                return [];
        }
    };

    return (
        <Fragment>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
                        <div className="mb-3 mb-md-0">
                            <h1 className="mb-1 h2 fw-bold">All Jobs</h1>
                            <Breadcrumb>
                                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                                <Breadcrumb.Item href="#">Jobs</Breadcrumb.Item>
                                <Breadcrumb.Item active>All</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        {/* <div>
                            <Link to="#" className="btn btn-primary">
                                Add New Courses
                            </Link>
                        </div> */}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col lg={12} md={12} sm={12}>
                    <Tab.Container defaultActiveKey="all" activeKey={activeTab} onSelect={handleTabSelect}>
                        <Card>
                            <Card.Header className="border-bottom-0 p-0 bg-white">
                                <Nav className="nav-lb-tab">
                                    <Nav.Item>
                                        <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                                            All Jobs
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="ongoing" className="mb-sm-3 mb-md-0">
                                            Ongoing Jobs
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="completed" className="mb-sm-3 mb-md-0">
                                            Completed Jobs
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Card.Header>
                            <Card.Body className="p-0">
                                <Tab.Content>
                                    {['all', 'ongoing', 'completed'].map(tab => (
                                        <Tab.Pane key={tab} eventKey={tab} className="pb-4">
                                            {loading && (
                                                <div className="d-flex justify-content-center align-items-center">
                                                    <Spinner animation="border" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </Spinner>
                                                </div>
                                            )}
                                            {!loading && !error && (
                                                <JobsTable
                                                    jobs_data={getJobsByTab(tab)}
                                                    formatDate={formatDate}
                                                    formatTime={formatTime}
                                                />
                                            )}
                                        </Tab.Pane>
                                    ))}
                                </Tab.Content>
                            </Card.Body>
                        </Card>
                    </Tab.Container>
                </Col>
            </Row>
        </Fragment>
    );
};

export default AllJobs;
