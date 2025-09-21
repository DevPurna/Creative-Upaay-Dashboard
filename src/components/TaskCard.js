import React from "react";

export default function TaskCard({ task, onMove }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg hover:scale-105 transition transform duration-200">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-800">{task.title}</h3>
        <span className="text-xs bg-gray-200 px-2 py-1 rounded">{task.priority}</span>
      </div>
      <p className="text-sm text-gray-500 mt-1">{task.description}</p>

      <div className="flex space-x-2 mt-3">
        {["todo", "progress", "done"].map((status) => (
          <button
            key={status}
            onClick={() => onMove(task.id, status)}
            className={`text-xs px-2 py-1 rounded ${
              task.status === status ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
