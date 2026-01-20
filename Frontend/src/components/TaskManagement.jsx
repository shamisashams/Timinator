import React, { useState } from "react";

const TaskManagement = ({ active, onTaskAdded }) => {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [course, setCourse] = useState("");

  const API_URL = "http://127.0.0.1:8000/api/tasks";

  const handleSubmit = async () => {
    if (!topic.trim()) {
      alert("Task topic is required!");
      return;
    }

    const payload = {
      topic: topic.trim(),
      description: description.trim() || null,
      deadline: deadline || null,
      course: course || null,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Validation Error:", data);
        alert("Validation error: " + (data.detail || JSON.stringify(data)));
      } else {
        alert("Task created successfully!");
        setTopic("");
        setDescription("");
        setDeadline("");
        setCourse("");
        if (onTaskAdded) onTaskAdded();
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("Network error! Check console.");
    }
  };

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
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter task topic"
            className="w-full border p-2 rounded mb-3"
          />

          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full border p-2 rounded mb-3"
          />

          <label>Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          />

          <label>Related Course</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border p-2 rounded mb-3"
          >
            <option value="">Select a course</option>
            <option value="Biology">Biology</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          <button
            onClick={handleSubmit}
            className="bg-blue p-5 w-full font-bold mt-6"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
