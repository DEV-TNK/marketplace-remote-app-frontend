import { useState, useEffect } from "react";
import { Card, Tab, Nav, Spinner } from "react-bootstrap";
import ServiceProviderProfileLayout from "./ServiceProviderProfileLayout";
import axios from "axios"; // Import axios library
import OutsourcedGigsTable from "./OutsourcedGigsTable";

const OutsourcedGigs = () => {
  const [gigs, setGigs] = useState([]);
  const [ongoingGigs, setOngoingGigs] = useState([]);
  const [completedGigs, setcompletedGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ongoingGigsHeader = [
    // { accessorKey: "gigTitle", header: "Gig Title" },
    { accessorKey: "ongoingServiceType", header: "Type de gig et description" },
    { accessorKey: "totalAmountPaid", header: "Salaire du gig" },
    { accessorKey: "serviceProvider", header: "Nom d'utilisateur" },
    // { accessorKey: "review", header: "Review" },
    { accessorKey: "deliveryDate", header: "Date" },
    { accessorKey: "status", header: "Statut" },
    { accessorKey: "paymentStatus", header: "Statut du paiement" },
  ];

  const completedGigsHeader = [
    // { accessorKey: "gigTitle", header: "Gig Title" },
    { accessorKey: "serviceType", header: "Type de gig et description" },
    { accessorKey: "totalAmountPaid", header: "Salaire du gig" },
    { accessorKey: "serviceProvider", header: "Nom d'utilisateur" },
    { accessorKey: "review", header: "Critique" },
    { accessorKey: "deliveryDate", header: "Date" },
    { accessorKey: "status", header: "Statut" },
    { accessorKey: "paymentStatus", header: "Statut du paiement" },
  ];

  useEffect(() => {
    const fetchgigs = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/provider-employed-gigs/${userId}`
        );
        setGigs(response.data.gigs);
        setOngoingGigs(response.data.ongoingGigs);
        setcompletedGigs(response.data.completedGigs);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching gigs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchgigs();
  }, []);

  const allgigsHeader = [
    { accessorKey: "serviceType", header: "Type de gig et description" },
    { accessorKey: "totalAmountPaid", header: "Salaire du gig" },
    // { accessorKey: "username", header: "User Name" },
    { accessorKey: "deliveryDate", header: "Date" },
    { accessorKey: "status", header: "Statut" },
    { accessorKey: "paymentStatus", header: "Statut du paiement" },
  ];

  return (
    <ServiceProviderProfileLayout>
      <Card className="border-0">
        <Tab.Container defaultActiveKey="all">
          <Card>
            <Card.Header className="border-bottom-0 p-0 bg-white">
              <Nav className="nav-lb-tab">
                <Nav.Item>
                  <Nav.Link eventKey="all" className="mb-sm-3 mb-md-0">
                    Tous
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="ongoinggig" className="mb-sm-3 mb-md-0">
                  Gigs en cours
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="completedgig" className="mb-sm-3 mb-md-0">
                  Gigs terminés
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Header>
              <div className="mb-3 mb-lg-0">
                <h3 className="mb-0">gigs</h3>
                <p className="mb-0">
                Gérez les gigs que vous avez employés et leurs mises à jour comme tous, en cours, et gigs terminés employés.
                </p>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <Tab.Content>
                <Tab.Pane eventKey="all" className="pb-4">
                  {isLoading ? (
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ minHeight: "200px" }}
                    >
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <OutsourcedGigsTable header={allgigsHeader} data={gigs} />
                  )}
                </Tab.Pane>
                <Tab.Pane eventKey="ongoinggig" className="pb-4">
                  <OutsourcedGigsTable
                    header={ongoingGigsHeader}
                    data={ongoingGigs}
                    // gigId={ongoingGigs._id}
                    price={gigs.salary}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="completedgig" className="pb-4">
                  <OutsourcedGigsTable
                    header={completedGigsHeader}
                    data={completedGigs}
                    // gigId={completedGigs._id}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Card>
    </ServiceProviderProfileLayout>
  );
};

export default OutsourcedGigs;
