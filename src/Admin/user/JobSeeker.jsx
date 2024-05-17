import React, { Fragment, useEffect, useState } from 'react';
import { Col, Row, Tab, Breadcrumb, Spinner } from 'react-bootstrap';
import JobSeekersGridCard from '../user/JobSeekerGridCard'; 
import JobSeekersListItems from '../user/JobSeekersListItems'; 
import axios from 'axios';
import GridListViewButton from '../../Components/elements/miscellaneous/GridListViewButton';

const JobSeekers = () => {
    const [jobSeekersData, setJobSeekersData] = useState([]);
    const [viewMode, setViewMode] = useState('grid');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchJobSeekers = async () => {
            try {
                setLoading(true); 
                const response = await axios.get('https://unleashified-backend.azurewebsites.net/api/v1/get-job-seekers');
                setJobSeekersData(response.data.jobSeekers);
                console.log(response.data.jobSeekers);
            } catch (error) {
                console.error('Error fetching job seekers data:', error);
            } finally {
                setLoading(false); 
            }
        };
        fetchJobSeekers();
    }, []);

    const handleViewModeChange = (mode) => {
        setViewMode(mode);
    };

    return (
        <Fragment>
            <Tab.Container defaultActiveKey="grid">
                <Row>
                    <Col lg={12} md={12} sm={12}>
                        <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
                            <div className="mb-3 mb-md-0">
                                <h1 className="mb-1 h2 fw-bold">
                                    Job Seekers <span className="fs-5 text-muted">({jobSeekersData.length})</span>
                                </h1>
                                <Breadcrumb>
                                    <Breadcrumb.Item href="#">Dashboard</Breadcrumb.Item>
                                    <Breadcrumb.Item href="#">User</Breadcrumb.Item>
                                    <Breadcrumb.Item active>Job Seekers</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            <div>
                                <GridListViewButton keyGrid="grid" keyList="list" />
                            </div>
                        </div>
                    </Col>
                </Row>

                <Tab.Content>
                    <Tab.Pane eventKey="grid" className="pb-4">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <JobSeekersGridCard jobSeekers={jobSeekersData} />
                        )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="list" className="pb-4">
                        {loading ? (
                            <div className="d-flex justify-content-center align-items-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                            </div>
                        ) : (
                            <JobSeekersListItems jobSeekers={jobSeekersData} />
                        )}
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Fragment>
    );
};

export default JobSeekers;
