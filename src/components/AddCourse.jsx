import React from "react";

const AddCourse = ({ active }) => {
  return <div className={`${active ? "block" : "hidden"}`}>AddCourse</div>;
};

export default AddCourse;
