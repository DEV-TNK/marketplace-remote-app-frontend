import React from 'react';
import { Card, Image } from 'react-bootstrap';

const FeaturedCompaniesCard = ({ companyLogo, companyName, companyIndustry, jobCount }) => {
  // Placeholder image URL for when companyLogo is not provided
  const placeholderLogo = "https://via.placeholder.com/150"; // Placeholder image URL

  return (
    <Card className="card-bordered card-hover" style={{ height: '300px' }}> {/* Set a fixed height for the card */}
      <Card.Body className="d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
          <Image
            src={companyLogo ? companyLogo : placeholderLogo} // Use placeholder if companyLogo is unavailable
            alt={companyName}
            className="img-fluid"
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} // Ensure proper fit
          />
        </div>
        <div className="my-4 text-center">
          <h3 className="lh-1">{companyName}</h3>
          <p className="mb-0">{companyIndustry} Industry</p>
        </div>
        <p className="mb-0 text-center">
          <span className="fw-semi-bold text-dark">{jobCount}</span> Job Posting
        </p>
      </Card.Body>
    </Card>
  );
};

export default FeaturedCompaniesCard;
