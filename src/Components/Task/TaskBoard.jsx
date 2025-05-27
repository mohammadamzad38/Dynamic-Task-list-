import { useState } from "react";

import Actions from "./Actions";
import Search from "./Search";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

export default function () {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React",
    description:
      "Effortlessly Organize, Prioritize, and Conquer Tasks with Tasker - Your Personal Productivity Ally for Seamless Goal Achievement and Stress-Free Task Management.",
    tags: ["web", "react", "javascript"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, settasks] = useState([defaultTask]);
  const [showModal, setShowModal] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState(null);
  const [favorite, setFavorite] = useState(false);

  function handleAddtask(newTask, isAdd) {
    if (isAdd) {
      settasks([...tasks, newTask]);
    } else {
      settasks(
        tasks.map((task) => {
          if (task.id === newTask.id) {
            return newTask;
          }
          return task;
        })
      );
    }

    setShowModal(false);
  }

  function handleEditTask(task) {
    setTaskUpdate(task);
    setShowModal(true);
  }

  function handleCloseClick() {
    setShowModal(false);
    setTaskUpdate(null);
  }

  function handleDeleteTask(taskId) {
    const taskAfterDelete = tasks.filter((task) => task.id !== taskId);
    settasks(taskAfterDelete);
  }

  function handleAllDelete() {
    tasks.length = 0;
    settasks([...tasks]);
  }

  function handleFavorite(taskId) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTask = [...tasks];
    newTask[taskIndex].isFavorite = !newTask[taskIndex].isFavorite;

    settasks(newTask);
  }

  function handleSearch(searchTerm) {
    const filterd = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

	settasks([...filterd])
  }


  return (
    <section className="mb-20" id="tasks">
      {showModal && (
        <TaskModal
          onSave={handleAddtask}
          onCloseClick={handleCloseClick}
          taskUpdate={taskUpdate}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end">
          <Search onSearch={handleSearch} />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <Actions
            onDeleteAllCLick={handleAllDelete}
            onAddClick={() => setShowModal(true)}
          />
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
            onFavorite={handleFavorite}
          />
        </div>
      </div>
    </section>
  );
}
