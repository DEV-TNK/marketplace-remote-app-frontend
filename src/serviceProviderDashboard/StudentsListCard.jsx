import React, { useMemo, useState, useEffect } from 'react';
import { Image, OverlayTrigger, Tooltip, Spinner } from 'react-bootstrap';
import TanstackTable from '../Components/elements/advance-table/TanstackTable';

const StudentsListCard = ({ students }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // State for loading

    useEffect(() => {
        // Simulate loading delay
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 1000); // Adjust delay as needed

        // Cleanup function to clear timeout
        return () => clearTimeout(timeout);
    }, []);

    const columns = useMemo(
        () => [
            {
                accessorKey: 'name',
                header: 'Name',
                filter: true, // Enable filtering for this column
                cell: ({ getValue, row }) => {
                    return (
                        <div className="d-flex align-items-center">
                            <Image src={row.original.image} alt="" className="rounded-circle avatar-md me-2" />
                            <h5 className="mb-0">{getValue()}</h5>
                        </div>
                    );
                }
            },
            {
                accessorKey: 'totalCourses',
                header: 'Enrolled'
            },
            {
                accessorKey: 'progress',
                header: 'Progress',
                cell: ({ row }) => {
                    const courseTitlesTooltip = (
                        <Tooltip id={`tooltip-${row.original.id}`}>
                            {row.original.courseTitles.map((course, index) => (
                                <span key={index}>{course}<br/></span>
                            ))}
                        </Tooltip>
                    );
                    return (
                        <OverlayTrigger placement="top" overlay={courseTitlesTooltip}>
                            <button className="btn btn-sm btn-outline-primary mt-3">
                                View
                            </button>
                        </OverlayTrigger>
                    );
                }
            },
            {
                accessorKey: 'state',
                header: 'Location',
                cell: ({ getValue, row }) => {
                    return (
                        <span className="fs-6">
                            <i className="fe fe-map-pin me-1"></i>
                            {getValue()}, {row.original.country}
                        </span>
                    );
                }
            }
        ],
        []
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter students based on search term
    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {loading ? ( // Show spinner if loading
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <TanstackTable
                    data={filteredStudents}
                    columns={columns}
                    filter={true}
                    pagination={true}
                    exportButton={true}
                />
            )}
        </div>
    );
};

export default StudentsListCard;
