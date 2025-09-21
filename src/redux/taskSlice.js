import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadTasks = () => {
  try {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
  } catch (e) {
    return [];
  }
};

// Save to localStorage
const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: loadTasks(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasks(state);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.find((t) => t.id === id);
      if (task) {
        task.status = status;
        saveTasks(state);
      }
    },
    deleteTask: (state, action) => {
      const newState = state.filter((t) => t.id !== action.payload);
      saveTasks(newState);
      return newState;
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
