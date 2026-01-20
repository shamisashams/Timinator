import React, { useState, useEffect } from "react";

const TaskList = ({ active }) => {
  const [tasks, setTasks] = useState([]);

  const API_URL = "http://127.0.0.1:8000/api/tasks";

  // Backend tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  // Pull tasks when component is loaded
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={`${active ? "block" : "hidden"} w-full`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl mx-auto">
        <div className="bg-white p-5 pb-10 rounded-2xl">
          <div className="text-center mb-10">
            <h2>Task List</h2>
            <div className="opacity-50">Manage and track your study tasks</div>
          </div>

          {/* TASK 1 */}
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
              <button className="bg-blue-200 px-4 pb-3 pt-2 rounded-lg m-3 font-bold">
                Working on
              </button>
              <button className="bg-green-200 px-4 pb-3 pt-2 rounded-lg m-3 font-bold">
                Completed
              </button>
            </div>
          </div>

          {/* TASK 2 */}
          <div className="bg-blue-200 p-2 my-2">
            <div className="flex justify-between px-5 py-2 font-bold border-b">
              <div>
                <div>Design Task Management Page</div>
                <div className="font-light text-red-500">in progress...</div>
              </div>
              <div>27/10/2025</div>
            </div>
            <div>
              <strong>Add Tasks</strong>
            </div>
            <div>
              <strong>Related:</strong> Software Project 1 - Study Planner
            </div>
            <div className="flex">
              <button className="bg-blue-200 px-4 pb-3 pt-2 rounded-lg m-3 font-bold">
                Working on
              </button>
              <button className="bg-green-200 px-4 pb-3 pt-2 rounded-lg m-3 font-bold">
                Completed
              </button>
            </div>
          </div>

          {/* DİNAMİK TASKS (BACKEND) */}
          {tasks && tasks.length > 0 && (
            <>
              <div className="mt-6 mb-2 font-bold opacity-60 text-center">
                Your Tasks
              </div>

              {tasks.map(task => (
                <div key={task.id} className="bg-zinc-100 p-2 my-2">
                  <div className="flex justify-between px-5 py-2 font-bold border-b">
                    <div>{task.topic}</div>
                    <div>{task.deadline || "No deadline"}</div>
                  </div>

                  <div>
                    <strong>{task.description || "No description"}</strong>
                  </div>

                  <div>
                    <strong>Related:</strong> {task.course || "No course"}
                  </div>

                  <div className="flex">
                    <button className="bg-blue-200 px-4 pb-3 pt-2 rounded-lg m-3 font-bold">
                      Working on
                    </button>
                    <button className="bg-green-200 px-4 pb-3 pt-2 rounded-lg m-3 font-bold">
                      Completed
                    </button>
                  </div>
                </div>
              ))}

              {/* Refresh Button */}
              <div className="text-center mt-4">
                <button
                  onClick={fetchTasks}
                  className="bg-blue-500 text-white p-2 rounded"
                >
                  Refresh Task List
                </button>
              </div>
            </>
          )}

          {/* task list in backend */}
          {(!tasks || tasks.length === 0) && (
            <div className="text-center opacity-50 mt-4">
              No additional tasks found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
