// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { Card, Table } from 'react-bootstrap';
import axios from 'axios';

const Browsers = ({ title }) => {
    
    const [platformData, setPlatformData] = useState([]);

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://marketplacebackendas-test.azurewebsites.net/api/v1/device-tracking');
                setPlatformData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card className="h-100">
            <Card.Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '3rem',
                    padding: '0.75rem 1.25rem',
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.125)'
                }}
            >
                <h4 className="mb-0">Devices </h4>
            </Card.Header>
            <Card.Body className="p-0">
                <Table hover bordered className="mb-0 text-nowrap table-centered" style={{ backgroundColor: 'white' }}>
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {platformData.length > 0 ? (
                            platformData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.Platform}</td>
                                    <td>{item.Count}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center">
                                    Loading data...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Browsers;
