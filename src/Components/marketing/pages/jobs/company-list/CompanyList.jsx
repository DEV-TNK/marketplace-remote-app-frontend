import React, { Fragment, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Col, Row, Container, Spinner, Tab } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import JobSearchBox from "../../../../../Components/marketing/common/jobs/JobSearchBox";
import CompanyListingCard from "../../../../../Components/marketing/common/cards/CompanyListingCard";
import GridListViewButton from "../../../../elements/miscellaneous/GridListViewButton";
import CompanyGridView from "../listing/CompanyGridView";
import CompanyListView from "./CompanyListView";
import CompanyFilters from "./CompanyFilters";
import axios from "axios";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [totalFilteredCompanies, setTotalFilteredCompanies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const RecordsPerPage = 4;

  useEffect(() => {
    const fetch = async () => {
      const userId = sessionStorage.getItem("UserId") || null;
      const userEmail = sessionStorage.getItem("email") || null;
      try {
        const response = await axios.post(
          "https://unleashified-backend.azurewebsites.net/api/v1/create-activity",
          {
            UserAction: "Company-Page",
            UserId: userId,
            UserEmail: userEmail,
            ActionType: "View-Page",
          }
        );
        console.log("this is the service response", response.data);
      } catch (error) {
        console.log("error");
      }
    };
    fetch();
  }, []);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          "https://unleashified-backend.azurewebsites.net/api/v1/companies"
        );
        const fetchedCompanies = response.data.companies || []; // Ensure we always have an array
        setCompanies(fetchedCompanies);
        setFilteredCompanies(fetchedCompanies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleFilterChange = (filteredData) => {
    setFilteredCompanies(filteredData);
    setPageNumber(0);
  };

  const pagesVisited = pageNumber * RecordsPerPage;
  const pageCount = Math.ceil(filteredCompanies.length / RecordsPerPage);

  const displayRecords = filteredCompanies
    .slice(pagesVisited, pagesVisited + RecordsPerPage)
    .map((record) => (
      <CompanyListingCard
        key={record.CompanyId} // Use the correct key from the record
        item={record}
      />
    ));
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
<Fragment>
      <section className="py-8 bg-light">
        <Container>
          <Row>
            <Col lg={8} md={10} xs={12}>
              <div>
                <div className="mb-4">
                  <h1 className="fw-bold mb-1">
                    Discover Best Companies for your needs!
                  </h1>
                  <p>Companies. reviews. Interviews. Jobs.</p>
                </div>
                {/* <CompaniesSearchBox /> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-8 bg-white">
        <Container>
          <Row>
            <Col md={4} xl={3}>
              <CompanyFilters onFilterChange={handleFilterChange} />
            </Col>
            <Col xl={9} md={8} className="mb-6 mb-md-0">
              <Tab.Container defaultActiveKey="grid">
                <Row className="align-items-center mb-4">
                  <Col xs>
                    <p className="mb-0">
                      {filteredCompanies
                        ? filteredCompanies.length + " Companies"
                        : ""}
                    </p>
                  </Col>
                  <Col xs="auto">
                    <div className="d-flex ">
                      <GridListViewButton keyGrid="grid" keyList="list" />
                    </div>
                  </Col>
                </Row>
                <Tab.Content>
                  <Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
                    <CompanyListView
                      filteredCompanies={filteredCompanies}
                      setTotalFilteredCompanies={setTotalFilteredCompanies}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="grid" className="pb-4 px-0">
                    <CompanyGridView
                      filteredCompanies={filteredCompanies}
                      setTotalFilteredCompanies={setTotalFilteredCompanies}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </section>
    </Fragment>
  );
};

export default CompanyList;
