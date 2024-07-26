import React, { Fragment, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import { Col, Row, Container, Spinner, Tab } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import JobSearchBox from "../../../../../Components/marketing/common/jobs/JobSearchBox";
import ServicesFilters from "./ServicesFilters";
import ServicesListingCard from "../../../../../Components/marketing/common/cards/ServicesCard";
import GridListViewButton from "../../../../elements/miscellaneous/GridListViewButton";
import ServicesListView from "./ServicesListView";
import ServicesGridView from "../listing/ServicesGridView";
import axios from "axios";

const ServicesList = () => {
  // const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [totalFilteredServices, setTotalFilteredServices] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  // const RecordsPerPage = 4;

  useEffect(() => {
    const fetch = async () => {
      const userId = sessionStorage.getItem("UserId") || null;
      const userEmail = sessionStorage.getItem("email") || null;
      try {
        const response = await axios.post(
          "https://marketplacebackendas-test.azurewebsites.net/api/v1/create-activity",
          {
            UserAction: "Service-Page",
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

  const handleFilterChange = (filteredData) => {
    console.log("this is service list filter", filterData);
    setFilteredServices(filteredData); // Update filtered services state
    setPageNumber(1); // Reset page number when filters change
    setTotalFilteredServices(filteredData.length);
  };
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://marketplacebackendas-test.azurewebsites.net/api/v1/get-all-services"
        );

        // if (response.data && Array.isArray(response.data)) {
        //   setFilteredServices(response.data);
        //   setTotalFilteredServices(response.data.length);
        // } else {
        setFilteredServices([]);
        setTotalFilteredServices(0);
        // }
      } catch (error) {
        console.error("Error fetching services:", error);
        setFilteredServices([]);
        setTotalFilteredServices(0);
      } finally {
        setLoading(false); // Set loading state to false after data fetching is complete
      }
    };

    fetchServices();
  }, []);

  const startIndex = (pageNumber - 1) * 9 + 1;

  // Calculate the ending index for the current page
  let endIndex = startIndex + 8;
  if (endIndex > totalFilteredServices) {
    endIndex = totalFilteredServices;
  }

  // Calculate the displayed count
  const displayedCoursesCount = endIndex - startIndex + 1;

  return (
    <Fragment>
      <section className="py-8 bg-light">
        <Container>
          <Row>
            <Col lg={8} md={10} xs={12}>
              <div>
                <div className="mb-4">
                  <h1 className="fw-bold mb-1">
                  Découvrez les meilleures services pour vos besoins !
                  </h1>
                  <p>Avis sur les services. Prix. Entretiens d'embauche. offres</p>
                </div>
                {/* <JobSearchBox /> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-8 bg-white">
        <Container>
          <Row>
            <Col md={4} xl={3}>
              <ServicesFilters onFilterChange={handleFilterChange} />
            </Col>
            <Col xl={9} md={8} className="mb-6 mb-md-0">
              <Tab.Container defaultActiveKey="grid">
                <Row className="align-items-center mb-4">
                  <Col xs>
                    <p className="mb-0">
                      {filteredServices
                        ? filteredServices.length + " Services"
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
                    <ServicesListView
                      filteredServices={filteredServices}
                      setTotalFilteredServices={setTotalFilteredServices}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="grid" className="pb-4 px-0">
                    <ServicesGridView
                      filteredServices={filteredServices}
                      setTotalFilteredServices={setTotalFilteredServices}
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

export default ServicesList;
