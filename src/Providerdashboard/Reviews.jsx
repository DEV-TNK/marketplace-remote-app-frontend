import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, ListGroup, Row, Col, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import ProviderProfileLayout from './ProviderProfileLayout';
import InstructorReviewCard from '../Components/marketing/common/cards/InstructorReviewCard';
import { FormSelect } from '../Components/elements/form-select/FormSelect';
import { useGlobalContext } from '../context/AuthContext';

const Reviews = () => {
  const { userId } = useGlobalContext();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    fetchUserRating();
  }, [userId]);

  const fetchUserRating = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://unleashified-backend.azurewebsites.net/api/v1/get-company-reviews/${userId}`);
      setReviews(response.data.reviews.map(review => ({
        ...review,
        user: {
          id: review.userId,
          jobTitle: review.jobTitle,
          username: review.User.username,
          imageUrl: review.User.imageUrl
        }
      })));
    } catch (error) {
      console.error('Error fetching user ratings:', error);
      setError('Failed to fetch user ratings. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Reviews after setting state:', reviews);
  }, [reviews]);

  const courselist = [
    { value: '1', label: 'How to easily create a website' },
    { value: '2', label: 'Grunt: The JavaScript Task...' },
    { value: '3', label: 'Vue js: The JavaScript Task...' }
  ];
  const ratinglist = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
  ];
  const sortby = [
    { value: 'Newest', label: 'Newest' },
    { value: 'Oldest', label: 'Oldest' }
  ];

  // Logic to paginate reviews
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <ProviderProfileLayout>
      <Card className="border-0">
        <Card.Header className="d-lg-flex align-items-center justify-content-between">
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Reviews</h3>
            <p className="mb-0">You have full control to manage your own account setting.</p>
          </div>
          {/* <div>
            <Link to="#" className="btn btn-outline-primary btn-sm">
              Export To CSV...
            </Link>
          </div> */}
        </Card.Header>
        <Card.Body>
          {/* <Form className="mb-4">
            <Row>
              <Col xl={6} lg={6} md={4} sm={12} className="mb-2 mb-lg-0">
                <FormSelect options={courselist} placeholder="All" />
              </Col>
              <Col xl={3} lg={3} md={4} sm={12} className="mb-2 mb-lg-0">
                <FormSelect options={ratinglist} placeholder="Rating" />
              </Col>
              <Col xl={3} lg={3} md={4} sm={12} className="mb-2 mb-lg-0">
                <FormSelect options={sortby} placeholder="Sort" />
              </Col>
            </Row>
          </Form> */}

          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <ListGroup variant="flush" className="border-top">
              {currentReviews.map((review, index) => (
                <ListGroup.Item key={index} className="px-0 py-4">
                  <InstructorReviewCard
                    item={review} 
                  />
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {reviews.length > reviewsPerPage && (
            <div className="d-flex justify-content-center mt-3">
              <Button 
                variant="primary" 
                className="mx-1"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button 
                variant="primary" 
                className="mx-1"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastReview >= reviews.length}
              >
                Next
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </ProviderProfileLayout>
  );
};

export default Reviews;
