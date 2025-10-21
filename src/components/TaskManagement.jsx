import React from "react";

const TaskManagement = ({ active }) => {
  return <div className={`${active ? "block" : "hidden"}`}>TaskManagement</div>;
};

export default TaskManagement;
