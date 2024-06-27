import React, { useState } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  dueDate: string; // Added due date to Task type
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    dueDate: ""
  });
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formValues.title && formValues.description && formValues.dueDate) {
      if (editTaskId !== null) {
        // Edit existing task
        const updatedTasks = tasks.map((task) =>
          task.id === editTaskId
            ? {
                ...task,
                title: formValues.title,
                description: formValues.description,
                dueDate: formValues.dueDate
              }
            : task
        );
        setTasks(updatedTasks);
        setEditTaskId(null);
      } else {
        // Add new task
        const newTask: Task = {
          id: Date.now(),
          title: formValues.title,
          description: formValues.description,
          dueDate: formValues.dueDate
        };
        setTasks([...tasks, newTask]);
      }
      setFormValues({ title: "", description: "", dueDate: "" });
    }
  };

  const handleEditTask = (task: Task) => {
    setFormValues({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate
    });
    setEditTaskId(task.id);
  };

  const handleDeleteTask = (taskId: number) => {
    const filteredTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(filteredTasks);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Task Management App</h1>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row items-center mb-2">
          <label htmlFor="title" className="mr-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-2">
          <label htmlFor="description" className="mr-2">
            Description:
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-2">
          <label htmlFor="dueDate" className="mr-2">
            Due Date:
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formValues.dueDate}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded w-full sm:w-auto"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {editTaskId !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-300 py-2"
          >
            <div>
              <h2 className="text-xl font-bold">{task.title}</h2>
              <p className="text-gray-600">{task.description}</p>
              <p className="text-gray-500">Due: {task.dueDate}</p>{" "}
              {/* Display due date */}
            </div>
            <div className="flex mt-2 sm:mt-0">
              <button
                onClick={() => handleEditTask(task)}
                className="text-blue-500 hover:text-blue-600 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
