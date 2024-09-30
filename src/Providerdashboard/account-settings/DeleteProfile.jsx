// import node module libraries
import React, {useState} from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';
import ProviderProfileLayout from '../ProviderProfileLayout';
import { useGlobalContext } from "../../context/AuthContext";

const DeleteProfile = () => {
    const { userId } = useGlobalContext(); 
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleDeleteAccount = async () => {
        setProcessing(true); 

        try {
            const response = await axios.delete(
              `https://marketplacebackendas-test.azurewebsites.net/api/v1/user/${userId}`
            );
            showToast(response.data.message);
            sessionStorage.clear();
            navigate("/");
            setUser(null);
            setUserRole(null);
            setUserImage(null);
          } catch (error) {
            console.error("Error deleting profile:", error);
            showToast(error.response.message);
        } finally {
            setProcessing(false); 
        }
    };

    return (
        <ProviderProfileLayout>
            <Card className="border-0">
                <Card.Header>
                    <div className="mb-3 mb-lg-0">
                        <h3 className="mb-0">Supprimer votre compte</h3>
                        <p className="mb-0">Supprimez ou fermez votre compte définitivement. </p>
                    </div>
                </Card.Header>
                <Card.Body>
                    <span className="text-danger h4">Avertissement</span>
                    <p>
                    Si vous fermez votre compte, vous serez désabonné de tous vos cours 0, et vous perdrez définitivement l’accès.
                    </p>
                    <Button variant="danger" onClick={() => setShowModal(true)}>
                        {processing ? "Processing..." : " Fermer mon compte."}
                    </Button>

                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDeleteAccount} disabled={processing}>
                                {processing ? "Deleting..." : "Delete"}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </ProviderProfileLayout>
    );
};

export default DeleteProfile;
