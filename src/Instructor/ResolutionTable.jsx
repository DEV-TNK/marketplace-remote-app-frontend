import React, { Fragment, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import DotBadge from "../Components/elements/bootstrap/DotBadge";
import TanstackTable from "../Components/elements/advance-table/TanstackTable";

const resolutionTable = ({ data, datas, dataes, header }) => {
  const columns = useMemo(() => {
    return header.map(({ accessorKey, header }) => ({
      header: header,
      accessorKey: accessorKey,
      cell: ({ row }) => {
        if (accessorKey === "id") {
          return (
            <Link to="#" className="text-inherit">
              <p className="mb-1 text-primary-hover">00{row.original.id}</p>
            </Link>
          );
        } else if (accessorKey === "status") {
          return (
            <Fragment>
              <DotBadge
                bg={
                  row.original.status.toLowerCase() === "ongoing"
                    ? "warning"
                    : row.original.status.toLowerCase() === "completed"
                    ? "success"
                    : row.original.status.toLowerCase() === "pending"
                    ? "primary"
                    : ""
                }
              ></DotBadge>
              {row.original.status
                ? row.original.status.charAt(0).toUpperCase() +
                  row.original.status.slice(1)
                : ""}
            </Fragment>
          );
        } else if (accessorKey === "reason") {
          return (
            <Fragment>
              <p className="mb-1 text-primary-hover">{row.original.reason}</p>
            </Fragment>
          );
        } else if (accessorKey === "message") {
          // Shorten message to 20 characters and show full text as a tooltip
          const shortenedMessage =
            row.original.message.length > 30
              ? row.original.message.slice(0, 30) + "..."
              : row.original.message;
          return (
            <p
              className="mb-1 text-primary-hover cursor-pointer"
              title={row.original.message} // Add title attribute for tooltip
            >
              {shortenedMessage}
            </p>
          );
        } else if (accessorKey === "date") {
          const updatedAt = new Date(row.original.updatedAt);
          const formattedDate = updatedAt.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          });
          return <Fragment>{formattedDate}</Fragment>;
        } else {
          return <span>{row.original[accessorKey]}</span>;
        }
      },
    }));
  }, [header]);

  return data || datas || dataes ? (
    <TanstackTable
      data={data || datas || dataes}
      columns={columns}
      filter={true}
      filterPlaceholder="Search conflicts"
      pagination={true}
    />
  ) : (
    <div>Loading...</div>
  );
};

export default resolutionTable;
