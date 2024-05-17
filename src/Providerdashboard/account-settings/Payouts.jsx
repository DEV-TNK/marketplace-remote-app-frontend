import React, { useState, useMemo, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Dropdown,
  Badge,
  Image,
  Alert,
  Form,
  Table,
  Button,
  Spinner 
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
import ApexCharts from '../../Components/elements/charts/ApexCharts';
import { FormSelect } from '../../Components/elements/form-select/FormSelect';
import { numberWithCommas } from '../../helper/utils';

import ProviderProfileLayout from '../ProviderProfileLayout';
import { ProviderPaymentHistory } from './ProviderPaymentHistory';
import { PayoutChartSeries, PayoutChartOptions } from '../../data/charts/ChartData';

const Payouts = () => {
  const [filtering, setFiltering] = useState('');
  const [rowSelection, setRowSelection] = useState({});
  const [loading, setLoading] = useState(false); 

  const nairaSign = "\u20A6";

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

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ getValue }) => {
          return '#' + getValue();
        }
      },
      { accessorKey: 'method', header: 'Method' },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ getValue }) => {
          return nairaSign + numberWithCommas(getValue());
        }
      },
      { accessorKey: 'date', header: 'Date' },
      { accessorKey: 'jobTitle', header: 'Job Title' },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
          return (
            <Badge
              bg={`${getValue() === 'Pending'
                ? 'warning'
                : getValue() === 'success'
                  ? 'success'
                  : 'danger'
                } `}
            >
              {getValue()}
            </Badge>
          );
        }
      },
    ],
    []
  );

  const historyData = ProviderPaymentHistory();

  const table = useReactTable({
    data: historyData,
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

  useEffect(() => {
    setLoading(true); 

    
    const fetchData = setTimeout(() => {
      setLoading(false); 
    }, 2000); 

    return () => clearTimeout(fetchData); 
  }, []);

  return (
    <ProviderProfileLayout>
      <Card className="border-0 mt-0">
        <Card.Header>
          <h3 className="mb-0 h4">Payment History</h3>
        </Card.Header>
        <Card.Body className="p-0 pb-4">
          {loading ? ( 
            <div className="text-center my-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
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
          )}

          <div className="mt-4">
            <Pagination table={table} />
          </div>
        </Card.Body>
      </Card>
    </ProviderProfileLayout>
  );
};

export default Payouts;
