// Dashboard.js
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import homeIcon from "../assets/home.png";
import messagesIcon from "../assets/messages.png";
import tasksIcon from "../assets/tasks.png";
import membersIcon from "../assets/members.png";
import settingsIcon from "../assets/settings.png";
import sidebarLogo from "../assets/logo.png"; 
import arrow from "../assets/arrow.png";
import square from "../assets/square.png";
import dots3 from "../assets/dots3.png";
import lampOn from "../assets/lampOn.png";
import searchIcon from "../assets/searchIcon.png";
import righticons from "../assets/righticons.png";
import arrowDown from "../assets/arrowDown.png";
import profile1 from "../assets/profile1.png";
import profiles from "../assets/profiles.png";
import headingIcons from "../assets/headingIcons.png";
import filterIcon from "../assets/filterIcon.png";
import calendarIcon from "../assets/calendarIcon.svg";
import shareIcon from "../assets/shareIcon.svg";
import row2 from "../assets/row2.png";

import blueSquare from "../assets/blueSquare.png"; 
import itemProfiles from "../assets/itemProfiles.png"; // used in cards
import commentsIcon from "../assets/commentsIcon.png";
import filesIcon from "../assets/filesIcon.png";
import dotsIcon from "../assets/dots3.png"; // three dots icon used in cards

// helper: generate simple unique id
const genId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // UI constants 
  const COLORS = {
    todo: "#5030e5",
    inprogress: "#ffa500",
    done: "#8bc48a",
  };

  // --- Load saved tasks from localStorage or default sample tasks ---
  const [columns, setColumns] = useState(() => {
    try {
      const saved = localStorage.getItem("creativeUpaayTasks_v1");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      /* ignore */
    }

    // default starter data 
    return {
      todo: [
        {
          id: genId(),
          title: "Brainstorming",
          desc1:
            "Brainstorming brings team members' diverse experience into play.",
          desc2: "",
          priority: "Low",
          comments: 12,
          files: 0,
        },
        {
          id: genId(),
          title: "Design Login Page",
          desc1: "Create a responsive login page for the app",
          desc2: "Use Figma design and follow guidelines",
          priority: "Completed",
          comments: 10,
          files: 0,
        },
        {
          id: genId(),
          title: "Wireframe",
          desc1: "Prepare wireframes for new features",
          desc2: "Align with UX best practices",
          priority: "High",
          comments: 6,
          files: 2,
        },
      ],
      inprogress: [
        {
          id: genId(),
          title: "Mobile App Design",
          desc1: "Design the new mobile app UI screens",
          desc2: "Focus on dashboard and onboarding",
          priority: "High",
          comments: 8,
          files: 2,
        },
        {
          id: genId(),
          title: "Website Redesign",
          desc1: "Update colors and typography",
          desc2: "Align with branding guide",
          priority: "Low",
          comments: 5,
          files: 1,
        },
        {
          id: genId(),
          title: "Prototype Testing",
          desc1: "Conduct prototype testing with users",
          desc2: "Document feedback",
          priority: "Completed",
          comments: 7,
          files: 3,
        },
      ],
      done: [
        {
          id: genId(),
          title: "API Integration",
          desc1: "Integrated login & signup APIs",
          desc2: "Tested with Postman",
          priority: "Completed",
          comments: 6,
          files: 3,
        },
        {
          id: genId(),
          title: "Setup Git Repo",
          desc1: "Initialized repo and pushed code",
          desc2: "Shared with team members",
          priority: "Completed",
          comments: 4,
          files: 0,
        },
        {
          id: genId(),
          title: "Deploy Project",
          desc1: "Deployed on production server",
          desc2: "Configured CI/CD pipeline",
          priority: "Completed",
          comments: 9,
          files: 5,
        },
      ],
    };
  });

  // Persist columns to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("creativeUpaayTasks_v1", JSON.stringify(columns));
    } catch (e) {
      console.error("Could not save tasks", e);
    }
  }, [columns]);

  // Filter state: 'All' | 'Low' | 'High' | 'Completed'
  const [filterPriority, setFilterPriority] = useState("All");

  // Add-task form control: which column's add form is open (or null)
  const [addFormFor, setAddFormFor] = useState(null);
  const [newTaskData, setNewTaskData] = useState({
    title: "",
    desc1: "",
    desc2: "",
    priority: "Low",
  });

  // --- Drag & Drop handlers ---
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const srcId = source.droppableId;
    const destId = destination.droppableId;

    // re-order within same column
    if (srcId === destId) {
      const items = Array.from(columns[srcId]);
      const [moved] = items.splice(source.index, 1);
      items.splice(destination.index, 0, moved);
      setColumns((prev) => ({ ...prev, [srcId]: items }));
      return;
    }

    // moving to different column
    const sourceItems = Array.from(columns[srcId]);
    const [moved] = sourceItems.splice(source.index, 1);
    const destItems = Array.from(columns[destId]);
    destItems.splice(destination.index, 0, moved);

    setColumns((prev) => ({
      ...prev,
      [srcId]: sourceItems,
      [destId]: destItems,
    }));
  };

  // Add Task submit handler
  const handleAddTask = (columnKey) => {
    if (!newTaskData.title.trim()) return;

    const task = {
      id: genId(),
      title: newTaskData.title.trim(),
      desc1: newTaskData.desc1.trim(),
      desc2: newTaskData.desc2.trim(),
      priority: newTaskData.priority,
      comments: 0,
      files: 0,
    };

    setColumns((prev) => ({
      ...prev,
      [columnKey]: [task, ...prev[columnKey]],
    }));

    // reset form & close
    setNewTaskData({ title: "", desc1: "", desc2: "", priority: "Low" });
    setAddFormFor(null);
  };

  // Utility: filtered tasks for rendering
  const getFiltered = (list) => {
    if (!filterPriority || filterPriority === "All") return list;
    return list.filter((t) => t.priority === filterPriority);
  };

  // small helper to display status tag style
  const statusClass = (priority) => {
    if (priority === "Low")
      return "px-2 py-1 text-xs font-semibold rounded-full bg-[#f9eee3] text-[#e3b698]";
    if (priority === "High")
      return "px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600";
    if (priority === "Completed")
      return "px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700";
    return "px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-700";
  };

  // column metadata to iterate
  const columnMeta = [
    { key: "todo", title: "To Do", color: COLORS.todo },
    { key: "inprogress", title: "On Progress", color: COLORS.inprogress },
    { key: "done", title: "Done", color: COLORS.done },
  ];

  return (
    <div className="flex h-screen relative">
      {/* ---------- Sidebar (kept my existing structure) ---------- */}
      <div
        className={`bg-white h-screen transition-all duration-300 overflow-hidden border-r ${
          isSidebarOpen ? "w-64" : "w-0"
        }`}
      >
        {isSidebarOpen && (
          <div className="p-4 relative h-full flex flex-col">
            <button
              className="absolute top-3 right-2 p-2 text-white rounded"
              onClick={() => setIsSidebarOpen(false)}
            >
              <img src={arrow} alt="Close" className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <img src={sidebarLogo} alt="Logo" className="w-6 h-6" />
              <span className="text-xl font-bold">Project M.</span>
            </div>

            <nav className="flex flex-col">
              {[
                homeIcon,
                messagesIcon,
                tasksIcon,
                membersIcon,
                settingsIcon,
              ].map((ic, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 hover:bg-[#f1eefd] rounded cursor-pointer"
                >
                  <img src={ic} alt={`menu-${i}`} className="w-4 h-4" />
                  <span className="font-medium text-gray-500">
                    {["Home", "Messages", "Tasks", "Members", "Settings"][i]}
                  </span>
                </div>
              ))}
            </nav>

            <hr className="my-6 border-gray-400" />

            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-semibold">MY PROJECTS</h3>
                <img src={square} alt="square Icon" className="w-4 h-4" />
              </div>

              {[
                { text: "Mobile App", color: "#6ee7b7" },
                { text: "Website Redesign", color: "#ffa500" },
                { text: "Dashboard UI", color: "#e4ccfd" },
                { text: "Marketing Site", color: "#76a5ea" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-3 p-2 hover:bg-[#f1eefd] rounded cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="font-medium text-gray-500 group-hover:text-black">
                      {item.text}
                    </span>
                  </div>

                  <img
                    src={dots3}
                    alt="Options"
                    className="w-4 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}

              <div className="relative mt-16 p-4 text-center bg-[#f5f5f5] rounded-xl">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-[#f1eefd] flex items-center justify-center shadow-lg">
                  <img src={lampOn} alt="Lamp On" className="w-6 h-6" />
                </div>

                <div className="pt-8">
                  <h3 className="font-semibold text-black text-sm mb-1">
                    Thoughts Time
                  </h3>
                  <p className="text-xs text-gray-400">
                    We don't have any notice for you, till then you can share
                    your thoughts with your peers.
                  </p>
                  <button className="mt-2 px-3 py-2 bg-white text-black border rounded-sm text-xs font-semibold hover:bg-white/90">
                    Write a message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!isSidebarOpen && (
        <button
          className="absolute top-2 left-0 -ml-6 p-2 bg-blue-500 text-white rounded-r"
          onClick={() => setIsSidebarOpen(true)}
        >
          &rarr;
        </button>
      )}

      {/* ---------- Main Right Content ---------- */}
      <div className="flex-1 bg-white p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-1/3">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <img src={searchIcon} alt="Search" className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search for anything..."
              className="border rounded p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <img
              src={righticons}
              alt="Right Icons"
              className="w-20 h-4 mr-20"
            />

            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <p className="font-medium">Palak Jain</p>
                <p className="text-xs text-gray-500">Rajasthan, India</p>
              </div>
              <div className="flex items-center gap-1">
                <img
                  src={profile1}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <img src={arrowDown} alt="Arrow Down" className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Heading row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">Mobile App</h1>
            <img
              src={headingIcons}
              alt="Heading Icons"
              className="w-14 h-5 mt-1"
            />
          </div>
          <img src={profiles} alt="Profiles" className="w-30 h-8 rounded" />
        </div>

        {/* Filters / Actions row */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-3 items-center">
            <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 min-w-[100px]">
              <img src={filterIcon} alt="Filter" className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
              <img src={arrowDown} alt="Arrow Down" className="w-4 h-4" />
            </button>

            <button className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 min-w-[100px]">
              <img src={calendarIcon} alt="Calendar" className="w-4 h-4" />
              <span className="text-sm font-medium">Today</span>
              <img src={arrowDown} alt="Arrow Down" className="w-4 h-4" />
            </button>

            {/* Simple filter select (All / Low / High / Completed) */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="ml-2 border rounded px-2 py-1 text-sm"
            >
              <option value="All">All priorities</option>
              <option value="Low">Low</option>
              <option value="High">High</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">
              <img src={shareIcon} alt="Share" className="w-4 h-4" />
              <span className="text-sm font-medium">Share</span>
            </button>
            <span className="w-px h-4 bg-gray-400 mx-2"></span>
            <img src={row2} alt="row2" className="w-14 h-6" />
          </div>
        </div>

        {/* ---------- Task Board with Drag & Drop ---------- */}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-4 mt-6">
            {columnMeta.map((col) => (
              <div
                key={col.key}
                className="flex-1 bg-[#f5f5f5] border rounded-lg p-4 flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: col.color }}
                    ></span>
                    <h3 className="font-semibold text-gray-700">{col.title}</h3>
                  </div>
                  <span className="font-medium text-gray-500 bg-gray-100 px-2 rounded-full">
                    {getFiltered(columns[col.key]).length}
                  </span>

                  {/* Add Task button */}
                  <button
                    onClick={() => {
                      setAddFormFor(addFormFor === col.key ? null : col.key);
                      setNewTaskData({
                        title: "",
                        desc1: "",
                        desc2: "",
                        priority: "Low",
                      });
                    }}
                    className="ml-auto text-sm px-2 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
                  >
                    + Add
                  </button>
                </div>

                {/* colored underline under heading */}
                <div
                  className="h-1 rounded"
                  style={{ backgroundColor: col.color }}
                />

                {/* Add form (inline) */}
                {addFormFor === col.key && (
                  <div className="bg-white p-3 rounded shadow-sm">
                    <input
                      value={newTaskData.title}
                      onChange={(e) =>
                        setNewTaskData((s) => ({ ...s, title: e.target.value }))
                      }
                      placeholder="Title"
                      className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <input
                      value={newTaskData.desc1}
                      onChange={(e) =>
                        setNewTaskData((s) => ({ ...s, desc1: e.target.value }))
                      }
                      placeholder="Short description"
                      className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <input
                      value={newTaskData.desc2}
                      onChange={(e) =>
                        setNewTaskData((s) => ({ ...s, desc2: e.target.value }))
                      }
                      placeholder="Additional notes"
                      className="w-full border rounded px-2 py-1 mb-2"
                    />
                    <div className="flex items-center gap-2">
                      <select
                        value={newTaskData.priority}
                        onChange={(e) =>
                          setNewTaskData((s) => ({
                            ...s,
                            priority: e.target.value,
                          }))
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option>Low</option>
                        <option>High</option>
                        <option>Completed</option>
                      </select>
                      <button
                        onClick={() => handleAddTask(col.key)}
                        className="ml-auto bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setAddFormFor(null)}
                        className="bg-gray-200 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Droppable area for column */}
                <Droppable droppableId={col.key}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="flex flex-col gap-3 min-h-[40px]"
                    >
                      {getFiltered(columns[col.key]).map((task, index) => (
                        <Draggable
                          draggableId={task.id}
                          index={index}
                          key={task.id}
                        >
                          {(providedDraggable, snapshot) => (
                            <div
                              ref={providedDraggable.innerRef}
                              {...providedDraggable.draggableProps}
                              {...providedDraggable.dragHandleProps}
                              className={`bg-white rounded-lg shadow-sm p-4 border-l-4 flex flex-col gap-2 ${
                                snapshot.isDragging ? "opacity-90" : ""
                              }`}
                              style={{
                                borderLeftColor: col.color,
                                ...providedDraggable.draggableProps.style,
                              }}
                            >
                              {/* first line: status & dots */}
                              <div className="flex justify-between items-center">
                                <span className={statusClass(task.priority)}>
                                  {task.priority}
                                </span>
                                <img
                                  src={dots3}
                                  alt="dots"
                                  className="w-4 h-1 cursor-pointer"
                                />
                              </div>

                              {/* heading */}
                              <h4 className="font-semibold text-gray-800">
                                {task.title}
                              </h4>

                              {/* description lines */}
                              {task.desc1 && (
                                <p className="text-xs text-gray-500">
                                  {task.desc1}
                                </p>
                              )}
                              {task.desc2 && (
                                <p className="text-xs text-gray-500">
                                  {task.desc2}
                                </p>
                              )}

                              {/* footer: profiles + comments + files */}
                              <div className="flex items-center justify-between mt-2">
                                <img
                                  src={itemProfiles}
                                  alt="Profiles"
                                  className="w-16 h-6 rounded-full"
                                />
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <img
                                      src={commentsIcon}
                                      alt="Comments"
                                      className="w-3 h-3"
                                    />
                                    <span>{task.comments} comments</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <img
                                      src={filesIcon}
                                      alt="Files"
                                      className="w-3 h-3"
                                    />
                                    <span>{task.files} files</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
