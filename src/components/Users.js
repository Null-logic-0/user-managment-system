"use client";
import { useSearchParams } from "next/navigation";
import UserTable from "./UserTable";

function Users({ usersData }) {
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy");

  let filteredUsers = [...usersData];

  if (sortBy) {
    const direction = sortBy === "name-asc" ? 1 : -1;
    filteredUsers.sort((a, b) => {
      const nameA = a.fullName || "";
      const nameB = b.fullName || "";
      return nameA.localeCompare(nameB) * direction;
    });
  }

  return <UserTable data={filteredUsers} />;
}

export default Users;
