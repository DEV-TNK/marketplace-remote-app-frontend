import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import ReactPaginate from 'react-paginate';
import JobListingListviewCard from '../../../../../Components/marketing/common/cards/JobListingListviewCard';
import CommonHeaderTabs from './CommonHeaderTabs';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const recordsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Extract company id from the URL
        const searchParams = new URLSearchParams(window.location.search);
        const companyId = searchParams.get('id');
        
        // Fetch jobs for the specified company id
        const response = await axios.get(`https://unleashified-backend.azurewebsites.net/api/v1/companySingle-all-jobs/${companyId}`);
        
        // Check response data type and set jobs state
        if (Array.isArray(response.data.jobs)) {
          setJobs(response.data.jobs);
        } else {
          console.error('Invalid response data format - expected array:', response.data);
        }

      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);

  const pageCount = Math.ceil(jobs.length / recordsPerPage);
  const pagesVisited = pageNumber * recordsPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayRecords = Array.isArray(jobs) && jobs.length > 0
    ? jobs
        .slice(pagesVisited, pagesVisited + recordsPerPage)
        .map((job, index) => <JobListingListviewCard key={index} item={job} />)
    : <div>No matching records found.</div>;

  return (
    <CommonHeaderTabs>
      <h2 className="mb-4">{jobs.length} job openings</h2>
      {displayRecords}
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
    </CommonHeaderTabs>
  );
};

export default Jobs;
