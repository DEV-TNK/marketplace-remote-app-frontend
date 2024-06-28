import React, { useState } from "react";
import { Button, Offcanvas, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const SupportModal = ({
  openModal,
  setOpenModal,
  supportID,
  userMessage,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    support_id: supportID,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      support_id: supportID,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate success without actual API call
    toast.success("Message sent successfully!", {
      position: toast.POSITION.TOP_RIGHT,
    });
    setOpenModal(false);
    setFormData({
      subject: "",
      message: "",
      support_id: "",
    });
    setLoading(false);
  };

  return (
    <Offcanvas
      show={openModal}
      onHide={() => setOpenModal(false)}
      placement="end"
      
      style={{ width: "550px" }} 
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Response Message</Offcanvas.Title>
      </Offcanvas.Header>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "90%", 
        }}
      >
        <Offcanvas.Body style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Form.Group className="mb-3" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Form.Label>User Message</Form.Label>
            <Form.Control
              as="textarea"
              name="user"
              id="user"
              rows={3}
              value={userMessage}
              readOnly
              style={{ flex: 1 }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <Form.Control type="hidden" value={supportID} />
          </Form.Group>
          <Form.Group className="mb-3" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              id="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Leave a message..."
              style={{ flex: 1 }}
            />
          </Form.Group>
        </Offcanvas.Body>
        <div className="d-flex justify-content-end p-3 border-top">
          <Button variant="secondary" onClick={() => onClose()} className="me-2">
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </Offcanvas>
  );
};

export default SupportModal;
