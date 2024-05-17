import React from 'react';
import { Card, Image } from 'react-bootstrap';

const FeaturedCompaniesCard = ({ companyLogo, companyName, companyIndustry, jobCount }) => {
  return (
    <Card className="card-bordered card-hover h-">
      <Card.Body>
		<div className='h-25'>
		<Image src={companyLogo} alt={companyName} className="img-fluid" style={{ width: '100%', height: '100px', objectFit: 'fill',}} />
		</div>
        <div className="my-4">
          <h3 className="lh-1">{companyName}</h3>
          <p className="mb-0">{companyIndustry} Industry</p>
        </div>
        <p className="mb-0">
          <span className="fw-semi-bold text-dark">{jobCount}</span> Job Posting
        </p>
      </Card.Body>
    </Card>
  );
};

export default FeaturedCompaniesCard;
