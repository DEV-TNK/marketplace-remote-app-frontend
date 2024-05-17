import React, { useState, useEffect } from "react";
import { Button, Card, Spinner, Tab, Modal } from "react-bootstrap";
import { FormSelect } from "../Components/elements/form-select/FormSelect";
import InstructorProfileLayout from "./JobSeekerProfileLayout";
import ResolutionTable from "./ResolutionTable";
import axios from "axios";
import { showToast } from "../Components/Showtoast";
import { useGlobalContext } from "../context/AuthContext";
const Resolution = () => {
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
    { accessorKey: "reason", header: "Reason" },
    { accessorKey: "message", header: "Message" },
    { accessorKey: "status", header: "Status" },
  ];

  useEffect(() => {
    const fetchAllResolutions = async () => {
      try {
        const userId = sessionStorage.getItem("UserId");
        const response = await axios.get(
          `https://unleashified-backend.azurewebsites.net/api/v1/get-my-conflict/${userId}`
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
    { value: "Fraud", label: "Fraud" },
    { value: "Job Submission", label: "Job Submission" },
    { value: "Service", label: "Service" },
    { value: "Payment Withdrawal", label: "Payment Withdrawal" },
    { value: "Non Payment", label: "Non Payment" },
  ];

  const handleResolutionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("this is submit");
    console.log("Selected Contact:", selectedContact);
    try {
      const response = await axios.post(
        "https://unleashified-backend.azurewebsites.net/api/v1/create-conflicts",
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
    <InstructorProfileLayout>
      <Card className="border-0">
        <Tab.Container defaultActiveKey="all">
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h3 className="mb-0">Conflict Resolution</h3>
                  <p className="mb-0">
                    Manage your conflict resolutions and its update like
                    pending, resolving, and finalized
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
                  Resolution Request
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
          <Modal.Title>Resolution Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormSelect
            options={contactOptions}
            value={selectedContact}
            onChange={(event) => setSelectedContact(event.target.value)}
            placeholder="Select Reason..."
          />
          <textarea
            className="form-control mt-3"
            rows="5"
            placeholder="Enter your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          {loading ? (
            <Button variant="primary" disabled style={{ opacity: ".7" }}>
              Processing
            </Button>
          ) : (
            <Button variant="primary" onClick={handleResolutionSubmit}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </InstructorProfileLayout>
  );
};

export default Resolution;
