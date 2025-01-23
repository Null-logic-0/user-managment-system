"use client";
import { useState } from "react";
import Pagination from "./Pagination";
import TableOperations from "./TableOperations";
import TableBody from "./TableBody";

function UserTable({ data }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(null);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
    setCurrentUserId(id);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <TableOperations userId={currentUserId} />
      <table className="table table-bordered shadow-md table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <TableBody
          selectedRows={selectedRows}
          handleCheckboxChange={handleCheckboxChange}
          currentData={currentData}
        />
      </table>
      {currentData.length === 0 && (
        <p className="text-center font-semibold text-xl">
          Users Table Is Empty
        </p>
      )}
      <Pagination
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}

export default UserTable;
