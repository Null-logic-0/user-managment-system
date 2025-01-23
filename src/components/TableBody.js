"use client";
import { formatTimeAgo } from "@/helpers/formatDate";
import { useState } from "react";
import { MdBlock } from "react-icons/md";

function TableBody({ currentData, selectedRows, handleCheckboxChange }) {
  return (
    <tbody>
      {currentData.map((row) => (
        <tr key={row.id}>
          <th scope="row">
            <input
              type="checkbox"
              checked={selectedRows.includes(row.id)}
              onChange={() => handleCheckboxChange(row.id)}
            />
          </th>
          <td
            className={`${
              selectedRows.includes(row.id) ? "line-through opacity-50" : ""
            }`}
          >
            <span
              className={
                row.blocked === true
                  ? "text-red-500 flex items-center gap-1"
                  : ""
              }
            >
              {row.blocked === true ? (
                <MdBlock className="text-red-500" />
              ) : null}
              {row.fullName}
            </span>
          </td>
          <td
            className={
              selectedRows.includes(row.id) ? "line-through opacity-50" : ""
            }
          >
            {row.email}
          </td>
          <td>
            <span
              className={
                selectedRows.includes(row.id) ? "text-red-500" : "text-blue-500"
              }
            >
              {formatTimeAgo(row.lastLogin)}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
