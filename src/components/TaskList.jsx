import React from "react";

const TaskList = ({ active }) => {
  return (
    <div className={`${active ? "block" : "hidden"} w-full`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl  mx-auto">
        <div className="bg-white p-5 pb-10 rounded-2xl ">
          <div className="text-center mb-10">
            <h2>Task List</h2>
            <div className="opacity-50">Manage and track your study tasks</div>
          </div>
          <div className="bg-zinc-100 p-2">
            <div className="flex justify-between px-5 py-2 font-bold border-b">
              <div>Design</div>
              <div>21/10/2025</div>
            </div>
            <div>
              <strong>Design the login page on figma</strong>
            </div>
            <div>
              <strong>Related:</strong> Software Project 1 - Study Planner
            </div>
            <div className="flex">
              <button className="">Working on</button>
              <button className="">Completed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
