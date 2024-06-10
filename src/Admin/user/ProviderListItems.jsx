// ProviderListItems.jsx

import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'react-bootstrap';
import { MoreVertical, Trash, Edit } from 'react-feather';
import TanstackTable from '../../Components/elements/advance-table/TanstackTable';
import axios from 'axios';

const ProviderListItems = ({ jobProviders }) => {
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
                accessorKey: 'companyName',
                header: 'Name',
                cell: ({ getValue, row }) => (
                    <div className="d-flex align-items-center">
                        <Image
                            src={row.original.companyLogo}
                            alt={getValue()}
                            className="rounded-circle avatar-md me-2"
                        />
                        <h5 className="mb-0">{getValue()}</h5>
                    </div>
                )
            },
            { accessorKey: 'companyLocation', header: 'Location' },
            { accessorKey: 'CompanyIndustry', header: 'Industry' },
            { accessorKey: 'companyDesignation', header: 'Sector' },
            { accessorKey: 'companyType', header: 'Type' },
            {
                accessorKey: 'contacts',
                header: 'Contacts',
                cell: ({ getValue, row }) => (
                    <div>
                        <p className="mb-0">{row.original.companyEmail}</p>
                        <p className="mb-0">{row.original.companyContact}</p>
                    </div>
                )
            },
            { accessorKey: 'totalJobs', header: 'Total Jobs' },
            {
                accessorKey: 'actions',
                header: '',
                cell: () => <ActionMenu />
            }
        ],
        []
    );

    return (
        <TanstackTable
            data={jobProviders}
            columns={columns}
            filter={true}
            filterPlaceholder="Search Job Providers"
            pagination={true}
        />
    );
};

export default ProviderListItems;
