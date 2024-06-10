import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const MostViewPages = ({ title }) => {
  const [pageViewsData, setPageViewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        const response = await axios.get('https://marketplacebackendas-test.azurewebsites.net/api/v1/get-action-type-analytics');
        const viewData = response.data.find(data => data.actionType === 'View-Page');
        setPageViewsData(viewData?.result || []);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchPageViews();
  }, []);

  const pageNames = {
    "Company-Page": "Company Page",
    "Job-Page": "Job Page",
    "landing-Page": "Landing Page",
    "Service-Page": "Service Page"
  };

  const generatePageLink = (pageType) => {
    switch (pageType) {
      case "Company-Page":
        return "/company";
      case "Job-Page":
        return "/jobs";
      case "landing-Page":
        return "/";
      case "Service-Page":
        return "/services";
      default:
        return "#";
    }
  };

  return (
    <Card className="h-100">
      <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Pages</h4>
      </Card.Header>
      <Card.Body className="p-0">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : error ? (
          <Alert variant="danger" className="m-3">
            {error}
          </Alert>
        ) : (
          <Table hover className="mb-0 text-nowrap table-centered">
            <thead className="table-light">
              <tr>
                <th scope="col">Page</th>
                <th scope="col">Views</th>
              </tr>
            </thead>
            <tbody>
              {pageViewsData.map((item, index) => (
                <tr key={index}>
                  <td>
                    {pageNames[item.Action] || item.Action}{' '}
                    <Link to={generatePageLink(item.Action)} className="text-inherit">
                      <i className="fe fe-external-link"></i>
                    </Link>
                  </td>
                  <td>{item.Total}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default MostViewPages;
