"use client";
import { useSearchParams, useRouter } from "next/navigation";

function SortBy({ options }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortBy = searchParams?.get("sortBy") || "";

  function handleChange(e) {
    const newSortBy = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("sortBy", newSortBy);
    router.push(`?${newParams.toString()}`);
  }

  return (
    <div>
      <select
        value={sortBy}
        onChange={handleChange}
        className="p-2 rounded border border-gray-300"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SortBy;
