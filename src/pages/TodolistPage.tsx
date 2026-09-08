import TaskCard from "../components/TaskCard";
import TodoModal from "../components/Modal";
import { type TaskCardProps } from "../libs/Todolist";
import { useState,useEffect } from "react";

const STORAGE_KEY = "todolist-tasks";

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}, [tasks]);
  const handleAdd = (newTask: TaskCardProps) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  return (
    <div className="col-12 m-2 p-0">
      <div className="container text-center">
        <h2>Todo List</h2>
        <span className="m-2">All : {tasks.length} Done : {tasks.filter((task) => task.isDone).length}</span>

        <div>
          <button
            type="button"
            className="btn btn-primary my-3"
            data-bs-toggle="modal"
            data-bs-target="#todoModal"
          >
            Add
          </button>
        </div>

        <TodoModal onAdd={handleAdd} />
        <>
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              title={task.title}
              description={task.description}
              deleteTaskFunc={deleteTask}
              toggleDoneTaskFunc={toggleDoneTask}
              isDone={task.isDone}
              key={task.id}
            />
          ))}
        </>
      </div>
    </div>
  );
}

export default App;