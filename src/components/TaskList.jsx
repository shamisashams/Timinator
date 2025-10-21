import React from "react";

const TaskList = ({ active }) => {
  return <div className={`${active ? "block" : "hidden"}`}>TaskList</div>;
};

export default TaskList;
