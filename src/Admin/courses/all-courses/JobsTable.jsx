import React, { Fragment, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import DotBadge from '../../../Components/elements/bootstrap/DotBadge';
import TanstackTable from '../../../Components/elements/advance-table/TanstackTable';
import axios from 'axios';
import { showToast } from "../../../Components/Showtoast";

const formatDate = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = dateTime.toLocaleDateString('en-US', options);
    const day = dateTime.getDate();
    const suffix = ['st', 'nd', 'rd'][((day + 90) % 100 - 10) % 10 - 1] || 'th';
    
    const timeOptions = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = dateTime.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate.replace(/\b(\d{1,2})\b/g, `$1${suffix}`)} at ${formattedTime}`;
};



const JobsTable = ({ jobs_data }) => {
    const [statusChanged, setStatusChanged] = useState(false);

    const handleStatusChange = async (id, status) => {
        try {
            const response = await axios.put(`https://remsana-backend-testing.azurewebsites.net/api/v1/jobs/${id}`, { status });
            setStatusChanged(true);
            const message = response.data.message;
            showToast(message); 
        } catch (error) {
            console.error('Error updating status:', error);
            showToast('Error updating status'); 
        }
    };

    const getStatusBadgeColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'warning';
            case 'live':
                return 'success';
            case 'rejected':
                return 'fail';
            default:
                return '';
        }
    };

    const columns = useMemo(() => [
        {
            header: 'Employer',
            accessorKey: 'employer',
            cell: ({ row }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src={row.original?.jobPoster?.companyLogo} 
                        alt="Company Logo" 
                        style={{ width: '100px', height: 'auto', marginRight: '10px' }} // Adjust the width and height as needed
                    /> 
                    <div>
                        <div style={{ fontWeight: 'bold' }}>{row.original?.jobPoster?.companyName}</div> {/* Company name */}
                        <div>Added on {formatDate(row.original?.createdAt)}</div> {/* Modified this line */}
                    </div>
                </div>
            ),
        },
    
        {
            header: 'Title',
            accessorKey: 'title',
            cell: ({ row }) => (
                <span>{row.original?.jobTitle}</span>
            ),
        },
        {
            header: 'Industry',
            accessorKey: 'industry',
            cell: ({ row }) => (
                <span>{row.original?.department}</span>
            ),
        },
        
        {
            header: 'Type',
            accessorKey: 'type',
            cell: ({ row }) => (
                <span>{row.original?.jobType}</span>
            ),
        },
        {
            header: 'Amount',
            accessorKey: 'amount',
            cell: ({ row }) => (
                <span>{row.original?.jobSalary}</span>
            ),
        },
        {
            header: 'Payment',
            accessorKey: 'payment',
            cell: ({ row }) => (
                <span>{row.original?.paymentStatus}</span>
            ),
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => (
                <Fragment>
                    <DotBadge bg={getStatusBadgeColor(row.original?.status)} />
                    {row.original?.status}
                </Fragment>
            ),
        }
    ], []);

    const data = useMemo(() => jobs_data || [], [jobs_data]);

    return (
        <Fragment>
            <TanstackTable
                data={data}
                columns={columns}
                filter={true}
                filterPlaceholder="Search Jobs"
                pagination={true}
            />
        </Fragment>
    );
};

export default JobsTable;
