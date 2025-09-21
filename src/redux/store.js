import { createStore } from "redux";
import tasksReducer from "./taskSlice";

const saveToLocalStorage = (state) => {
  localStorage.setItem("appState", JSON.stringify(state));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem("appState");
  return data ? JSON.parse(data) : undefined;
};

const store = createStore(tasksReducer, loadFromLocalStorage());

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
