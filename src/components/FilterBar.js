import React from "react";

export default function FilterBar({ onFilter }) {
  return (
    <div className="flex space-x-4 mb-6">
      <select
        onChange={(e) => onFilter(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">All</option>
        <option value="High">High Priority</option>
        <option value="Low">Low Priority</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}
