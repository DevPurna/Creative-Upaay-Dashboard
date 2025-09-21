# Creative Upaay Dashboard

A **Kanban-style task management dashboard** built with the **MERN stack (frontend only for assignment)**.  
Features include task creation, drag-and-drop movement across columns, and localStorage persistence.

---

## 🚀 Features

- Create new tasks with title & description
- Drag-and-drop tasks between columns (To Do → In Progress → Done)
- Tasks are saved in localStorage (persist after refresh)
- Responsive design with TailwindCSS
- Modern & clean UI

---

## 📂 Project Structure

creative-upaay-dashboard/
│
├── src/
│ ├── components/ # Reusable components (TaskCard, Navbar, FilterBar, etc.)
│ ├── pages/ # Page-level components (Dashboard.js, NotFound.js)
│ ├── redux/ # Store, reducers, actions
│ ├── utils/ # Helper functions
│ ├── styles/ # Global CSS or Tailwind configs
│ ├── App.js
│ └── index.js

---

## ⚙️ Installation & Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/creative-upaay-dashboard.git
   cd creative-upaay-dashboard
   ```

Install dependencies:
npm install

Run the app:
npm start

🛠️ Tech Stack

React (Frontend)
Redux Toolkit (State Management)
TailwindCSS (Styling)
LocalStorage (Persistence)

📸 Screenshots

Dashboard View
Drag & Drop Example

📌 Future Improvements

Connect with backend (MongoDB + Express + Node)
User authentication
Analytics dashboard with charts
