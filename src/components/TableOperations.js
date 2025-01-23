"use client";
import { TbLockCancel } from "react-icons/tb";
import { TbLockOpen } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa";
import SortBy from "./SortBy";
import ActionButton from "./ActionButton";
import { blockUser, deleteUser, unBlockUser } from "@/lib/actions";

function TableOperations({ userId }) {
  return (
    <div className="flex justify-between pb-3">
      <div className="flex items-center gap-2">
        <ActionButton action={() => blockUser(userId)}>
          <TbLockCancel className="text-2xl text-gray-800" />
        </ActionButton>

        <ActionButton action={() => unBlockUser(userId)}>
          <TbLockOpen className="text-2xl text-blue-500" />
        </ActionButton>

        <ActionButton action={() => deleteUser(userId)}>
          <FaTrashAlt className="text-xl text-red-500" />
        </ActionButton>
      </div>

      <SortBy
        options={[
          { value: "name-asc", label: "Sort by Name (A-Z)" },
          { value: "name-desc", label: "Sort by Name (Z-A)" },
        ]}
      />
    </div>
  );
}

export default TableOperations;
