import { useState } from "react";

import Actions from "./Actions";
import Search from "./Search";
import TaskList from "./TaskList";

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

  return (
    <section className="mb-20" id="tasks">
      <div className="container">
        <div className="p-2 flex justify-end">
          <Search />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <Actions />
          <TaskList tasks={tasks}/>
        </div>
      </div>
    </section>
  );
}
