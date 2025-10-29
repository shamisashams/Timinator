import React from "react";

const TaskManagement = ({ active }) => {
  return (
    <div className={`${active ? "block" : "hidden"} w-full`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl mx-auto">
        <div className="bg-white p-5 pb-10 rounded-2xl">
          <div className="text-center mb-10">
            <h2>Task Management</h2>
            <div className="opacity-50">
              Create and organize your study tasks
            </div>
          </div>
          <label>Task Topic</label>
          <input type="text" placeholder="eg. Complate Chapter 5 exercises" />
          <label>Description</label>
          <textarea placeholder="Describe the task details..." />
          <label>Deadline</label>
          <input type="date" placeholder="" />
          <label>Related Project or Course</label>
          <select name="" id="">
            <option value="" disabled selected>
              Select a course or project
            </option>
            <option value="">Biology</option>
            <option value="">Physics</option>
            <option value="">Mathematics</option>
            <option value="">Social studies</option>
          </select>
          <button className="bg-blue p-5 w-full font-bold mt-6">
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
