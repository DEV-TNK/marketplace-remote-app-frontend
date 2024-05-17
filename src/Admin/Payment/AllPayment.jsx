import React, { useState, useMemo } from 'react';
import {
    Card,
    Row,
    Col,
    Dropdown,
    Badge,
    Alert,
    Form,
    Table,
    Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Trash, Edit, MoreVertical } from 'react-feather';
import PayPal from '../../assets/images/brand/paypal-small.svg';
import Payoneer from '../../assets/images/brand/payoneer.svg';
import Pagination from '../../Components/elements/advance-table/Pagination';
import { FormSelect } from '../../Components/elements/form-select/FormSelect';
import { numberWithCommas } from '../../helper/utils';
import { WithdrawHistoryData } from '../../data/marketing/WithdrawHistoryData';
import { PayoutChartSeries, PayoutChartOptions } from '../../data/charts/ChartData';

// Define CustomToggle component
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

// Define ActionMenu function
// const ActionMenu = () => {
//     return (
//         <Dropdown>
//             <Dropdown.Toggle as={CustomToggle}>
//                 <MoreVertical size="15px" className="text-secondary" />
//             </Dropdown.Toggle>
//             <Dropdown.Menu align="end">
//                 <Dropdown.Header>SETTINGS--</Dropdown.Header>
//                 <Dropdown.Item eventKey="1">
//                     {' '}
//                     <Edit size="15px" className="dropdown-item-icon" /> Edit
//                 </Dropdown.Item>
//                 <Dropdown.Item eventKey="2">
//                     {' '}
//                     <Trash size="15px" className="dropdown-item-icon" /> Remove
//                 </Dropdown.Item>
//             </Dropdown.Menu>
//         </Dropdown>
//     );
// };

const AllPayment = () => {
    const [filtering, setFiltering] = useState('');
    const [rowSelection, setRowSelection] = useState({});
    const nairaSign = "\u20A6";

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                cell: ({ getValue }) => {
                    return '#' + getValue();
                }
            },
            {
                accessorKey: 'Type',
                header: 'Type',
                cell: ({ getValue }) => {
                    return nairaSign + numberWithCommas(getValue());
                }
            },
            { accessorKey: 'method', header: 'Method' },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ getValue }) => {
                    return (
                        <Badge
                            bg={`${getValue() === 'Pending'
                                ? 'warning'
                                : getValue() === 'Paid'
                                    ? 'success'
                                    : 'danger'
                            } `}
                        >
                            {getValue()}
                        </Badge>
                    );
                }
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                cell: ({ getValue }) => {
                    return nairaSign + numberWithCommas(getValue());
                }
            },
            { accessorKey: 'user details', header: 'User Details' },
            { accessorKey: 'date', header: 'Date' },
            // {
            //     accessorKey: 'actionmenu',
            //     header: '',
            //     cell: () => {
            //         return <ActionMenu />;
            //     }
            // }
        ],
        []
    );

    const data = useMemo(() => WithdrawHistoryData, []);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filtering,
            rowSelection
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setFiltering,
        debugTable: false,
    });

    const AlertDismissible = () => {
        const [show, setShow] = useState(true);
        if (show) {
            return (
                <Alert
                    variant="light-warning"
                    className="bg-light-warning text-dark-warning border-0"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    <strong>payout@geeks.com</strong>
                    <p>
                        Your selected payout method was confirmed on Next Payout on 15 July,
                        2020
                    </p>
                </Alert>
            );
        }
        return '';
    };

    const options1 = [
        { value: '30 days', label: '30 days' },
        { value: '2 Months', label: '2 Months' },
        { value: '6 Months', label: '6 Months' }
    ];

    const months = [
        { value: 'Oct 2020', label: 'Oct 2020' },
        { value: 'Jan 2021', label: 'Jan 2021' },
        { value: 'May 2021', label: 'May 2021' }
    ];

    const transactionType = [
        { value: 'Cash Transactions', label: 'Cash Transactions' },
        { value: 'Non Cash Transactions', label: 'Non Cash Transactions' },
        { value: 'Credit Transactions', label: 'Credit Transactions' }
    ];

    return (
        <Card className="border-0 mt-4">
            <Card.Header>
                <h3 className="mb-0 h4">All Payment</h3>
            </Card.Header>

            {/* <Card.Body>
                <Row className="align-items-center">
                    <Col lg={3} md={6} className="pe-md-0 mb-2 mb-lg-0">
                        <FormSelect options={options1} placeholder="Select Option" />
                    </Col>
                    <Col lg={3} md={6} className="pe-md-0 mb-2 mb-2 mb-lg-0">
                        <FormSelect options={months} placeholder="Months" />
                    </Col>
                    <Col lg={4} md={6} className="mb-2 mb-2 mb-lg-0">
                        <FormSelect
                            options={transactionType}
                            placeholder="Transaction Type"
                        />
                    </Col>
                    <Col lg={2} md={6} className="text-lg-end">
                        <Button variant="outline-secondary" href="#" download={true}>
                            <i className="fe fe-download"></i>
                        </Button>
                    </Col>
                </Row>
            </Card.Body> */}
            <Card.Body className="p-0 pb-4">
                <Table hover responsive className="text-nowrap table-centered">
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="mt-4">
                    <Pagination table={table} />
                </div>
            </Card.Body>
        </Card>
    );
};

export default AllPayment;
