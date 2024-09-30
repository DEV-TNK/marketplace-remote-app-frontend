// JobSeekersListItems.jsx

import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { MoreVertical, Trash, Edit, Mail } from 'react-feather';
import TanstackTable from '../../Components/elements/advance-table/TanstackTable';
import { numberWithCommas } from '../../helper/utils';
import axios from 'axios';

const JobSeekersListItems = () => {
    const [jobSeekers, setJobSeekers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchJobSeekers();
    }, []);

    const fetchJobSeekers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('https://marketplacebackendas-test.azurewebsites.net/api/v1/get-job-seekers');
            setJobSeekers(response.data.jobSeekers);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching job seekers data:', error);
            setError('Failed to fetch job seekers data');
            setLoading(false);
        }
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Link
            to=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
            className="btn-icon btn btn-ghost btn-sm rounded-circle"
        >
            {children}
        </Link>
    ));

    const ActionMenu = () => (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}>
                <MoreVertical size="15px" className="text-secondary" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
                <Dropdown.Header>SETTINGS</Dropdown.Header>
                <Dropdown.Item eventKey="1">
                    <Edit size="15px" className="dropdown-item-icon" /> Edit
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                    <Trash size="15px" className="dropdown-item-icon" /> Remove
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );

    const columns = useMemo(
        () => [
            {
                accessorKey: 'username',
                header: 'Name',
                cell: ({ getValue, row }) => (
                    <div className="d-flex align-items-center">
                        <Image
                            src={row.original.imageUrl}
                            alt=""
                            className="rounded-circle avatar-md me-2"
                        />
                        <h5 className="mb-0">{getValue()}</h5>
                    </div>
                )
            },
            {
                accessorKey: 'interest',
                header: 'Interests',
                cell: ({ getValue }) => {
                    const interests = getValue();
                    return Array.isArray(interests) ? interests.join(', ') : interests;
                }
            },
            { accessorKey: 'createdAt', header: 'Joined At' },
            { accessorKey: 'totalApplications', header: 'Total Applications' },
            { accessorKey: 'totalJobsWithOffersAccepted', header: 'Total Jobs Accepted' },
            {
                accessorKey: 'actions',
                header: '',
                cell: () => <ActionMenu />
            }
        ],
        []
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <TanstackTable
            data={jobSeekers}
            columns={columns}
            filter={true}
            filterPlaceholder=" Catégorie d’emploi recherchée"
            pagination={true}
        />
    );
};

export default JobSeekersListItems;
