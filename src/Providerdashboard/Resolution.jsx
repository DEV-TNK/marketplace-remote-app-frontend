import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Tab, Modal } from "react-bootstrap";
import FormSelect from "../Components/elements/form-select/FormSelect";
import ProviderProfileLayout from "./ProviderProfileLayout";
import ResolutionTable from "../Instructor/ResolutionTable";
import axios from "axios";
import { showToast } from "../Components/Showtoast";
import { useGlobalContext } from "../context/AuthContext";

const ProviderResolution = () => {
  const [resolution, setResolution] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { userId, userRole } = useGlobalContext();

  const allJobsHeader = [
    { accessorKey: "id", header: "Id" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "reason", header: "Raison" },
    { accessorKey: "message", header: "Message" },
    { accessorKey: "status", header: "Statut" },
  ];

  useEffect(() => {
    const fetchAllResolutions = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://marketplacebackendas-test.azurewebsites.net/api/v1/get-my-conflict/${userId}`
        );
        setResolution(response.data.conflicts);
      } catch (error) {
        console.error("Error fetching all jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllResolutions();
  }, []);

  const handleResolutionRequest = () => {
    setShowResolutionModal(true);
  };

  const handleCloseModal = () => {
    setShowResolutionModal(false);
    setSelectedContact(null);
    setMessage("");
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Selected Contact:", selectedContact);
    console.log("Message:", message);

    // Reset state and close modal
    handleCloseModal();
  };

  const contactOptions = [
    { value: "Fraud", label: "Fraude" },
    { value: "Job Submission", label: "Soumission de candidature" },
    { value: "Service", label: "Service" },
    { value: "Payment Withdrawal", label: "Retrait de paiement" },
    { value: "Non Payment", label: "Non-paiement" },
  ];

  const handleResolutionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("this is submit");
    console.log("Selected Contact:", selectedContact);
    try {
      const response = await axios.post(
        "https://marketplacebackendas-test.azurewebsites.net/api/v1/create-conflicts",
        {
          userId: userId,
          role: userRole,
          reason: selectedContact,
          message: message,
        }
      );
      setLoading(false);
      handleCloseModal();
      showToast(response.data.message);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // showToast(error.response.data.message);
    }
  };

  return (
    <ProviderProfileLayout>
      <Card className="border-0">
        <Tab.Container defaultActiveKey="all">
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-0">Résolution des conflits</h3>
                  <p className="mb-0">
                  Gérez vos résolutions de conflits et leur mise à jour comme en attente, résolution et finalisation.
                  </p>
                </div>
                {/* <Button variant="primary" onClick={handleResolutionRequest}>
                    Resolution Request
                  </Button> */}
                <Button
                  variant="primary"
                  onClick={handleResolutionRequest}
                  className="btn-sm btn-lg"
                >
                 Demande de résolution. 
                </Button>
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
                    <ResolutionTable header={allJobsHeader} data={resolution} />
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </Card>

      {/* Resolution Request Modal */}
      <Modal show={showResolutionModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Demande de résolution. </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormSelect
            options={contactOptions}
            value={selectedContact}
            onChange={(event) => setSelectedContact(event.target.value)}
            placeholder=" Sélectionnez raison..."
          />
          <textarea
            className="form-control mt-3"
            rows="5"
            placeholder="Entrez votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
          Fermer
          </Button>
          {loading ? (
            <Button variant="primary" disabled style={{ opacity: ".7" }}>
              Processing
            </Button>
          ) : (
            <Button variant="primary" onClick={handleResolutionSubmit}>
              Soumettre
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </ProviderProfileLayout>
  );
};

export default ProviderResolution;
