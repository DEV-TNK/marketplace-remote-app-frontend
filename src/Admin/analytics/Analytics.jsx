// import node module libraries
import { Fragment, useState, useEffect } from 'react';
import { Col, Row, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

// import custom components
import { FlatPickr } from '../../Components/elements/flat-pickr/FlatPickr';
import StatRightChart from '../analytics/stats/StatRightChart';
import MostViewPages from './MostViewPages';
import Browsers from './Browsers';
import SocialMediaTraffic from './SocialMediaTraffic';

// import required data files
import {
	SessionChartSeries,
	SessionChartOptions,
	ActiveUserChartSeries,
	ActiveUserChartOptions,
	TrafficChannelChartSeries,
	TrafficChannelChartOptions,
	OperatingSystemChartSeries,
	OperatingSystemChartOptions
} from '../../data/charts/ChartData';

const Analytics = () => {
	const [jobsPerMonth, setJobsPerMonth] = useState([]);
	const [servicesPerMonth, setServicesPerMonth] = useState([]);
	const [outsourcingJobs, setOutsourcingJobs] = useState([]);

	useEffect(() => {
		const fetchJobsAndServices = async () => {
			try {
				const jobsResponse = await axios.get('https://marketplacebackendas-test.azurewebsites.net/api/v1/jobs-per-month');
				setJobsPerMonth(jobsResponse.data);
			} catch (error) {
				console.error('Error fetching jobs per month:', error);
			}

			try {
				const servicesResponse = await axios.get('https://marketplacebackendas-test.azurewebsites.net/api/v1/service-per-month');
				setServicesPerMonth(servicesResponse.data);
			} catch (error) {
				console.error('Error fetching services per month:', error);
			}
		};

		// const fetchOutsourcingJobs = async () => {
		// 	try {
		// 		const outsourcingJobsResponse = await axios.get('https://unleashified-backend.azurewebsites.net/api/v1/outsource-jobs-per-month');
		// 		setOutsourcingJobs(outsourcingJobsResponse.data);
		// 	} catch (error) {
		// 		console.error('Error fetching outsourcing jobs:', error);
		// 	}
		// };

		fetchJobsAndServices();
	}, []);

	return (
		<Fragment>
			<Row>
				<Col lg={12} md={12} sm={12}>
					<div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
						<div className="mb-3 mb-md-0">
							<h1 className="mb-0 h2 fw-bold">Analytics</h1>
						</div>
						{/* <div className="d-flex">
							<div className="input-group me-3">
								<FlatPickr value={''} />
								<span className="input-group-text text-muted" id="basic-addon2">
									<i className="fe fe-calendar"></i>
								</span>
							</div>
							<Link to="#" className="btn btn-primary">
								Setting
							</Link>
						</div> */}
					</div>
				</Col>
			</Row>
			{/* <Row>
				<Col xl={3} lg={6} md={12} sm={12}>
					<StatRightChart
						title="USER"
						value="30.6k"
						summary="Number of sales"
						summaryValue="+20.9$"
						summaryIcon="up"
						showSummaryIcon
						classValue="mb-4"
						chartName="UserChart"
					/>
				</Col>

				<Col xl={3} lg={6} md={12} sm={12}>
					<StatRightChart
						title="UNIQUE VISITORS"
						value="256k"
						summary="Number of pending"
						summaryValue="5%"
						summaryIcon="down"
						showSummaryIcon
						classValue="mb-4"
						chartName="VisitorChart"
					/>
				</Col>

				<Col xl={3} lg={6} md={12} sm={12}>
					<StatRightChart
						title="BOUNCE RATE"
						value="51.46%"
						summary="Students"
						summaryValue="+1200"
						summaryIcon="up"
						showSummaryIcon
						classValue="mb-4"
						chartName="BounceChart"
					/>
				</Col>

				<Col xl={3} lg={6} md={12} sm={12}>
					<StatRightChart
						title="AVERAGE VISIT TIME"
						value="1m:17s"
						summary="Instructor"
						summaryValue="12%"
						summaryIcon="up"
						showSummaryIcon
						classValue="mb-4"
						chartName="AverageVisitTimeChart"
					/>
				</Col>
			</Row> */}

			{/* Jobs, Services, and Outsourced Jobs Per Month */}
			<Row>
				<Col xl={4} lg={12} md={12} className="mb-4">
					<Card className="h-100">
						<Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
							<h4 className="mb-0">Jobs Per Month</h4>
						</Card.Header>
						<Card.Body>
							<Table bordered>
								<thead>
									<tr>
										<th>Month</th>
										<th>Total Jobs</th>
									</tr>
								</thead>
								<tbody>
									{jobsPerMonth.map((job, index) => (
										<tr key={index}>
											<td>{job.month}</td>
											<td>{job.totalJobs}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>

				<Col xl={4} lg={12} md={12} className="mb-4">
					<Card className="h-100">
						<Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
							<h4 className="mb-0">Services Per Month</h4>
						</Card.Header>
						<Card.Body>
							<Table bordered>
								<thead>
									<tr>
										<th>Month</th>
										<th>Total Services</th>
									</tr>
								</thead>
								<tbody>
									{servicesPerMonth.map((service, index) => (
										<tr key={index}>
											<td>{service.month}</td>
											<td>{service.totalJobs}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>

				{/* <Col xl={4} lg={12} md={12} className="mb-4">
					<Card className="h-100">
						<Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
							<h4 className="mb-0">Outsourcing Jobs Per Month</h4>
						</Card.Header>
						<Card.Body>
							<Table bordered>
								<thead>
									<tr>
										<th>Month</th>
										<th>Total Outsource Jobs</th>
									</tr>
								</thead>
								<tbody>
									{outsourcingJobs.map((outsource, index) => (
										<tr key={index}>
											<td>{outsource.month}</td>
											<td>{outsource.totalJobs}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col> */}
			</Row>

			<Row>
			{/* <Col xl={4} lg={12} md={12} className="mb-4">
					<EmployeeOfRecord />
				</Col> */}
				<Col xl={4} lg={12} md={12} className="mb-4">
					<MostViewPages />
				</Col>
				<Col xl={4} lg={12} md={12} className="mb-4">
					<Browsers />
				</Col>
				{/* <Col xl={4} lg={12} md={12} className="mb-4">
					<SocialMediaTraffic />
				</Col> */}
			</Row>
		</Fragment>
	);
};

export default Analytics;
