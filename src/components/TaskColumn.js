import React from "react";
import TaskCard from "./TaskCard";

export default function TaskColumn({ title, tasks, onMove }) {
  return (
    <div className="w-1/3 bg-gray-50 p-4 rounded-xl">
      <h2 className="font-bold text-lg mb-3">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onMove={onMove} />
      ))}
    </div>
  );
}
