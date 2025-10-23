import React from "react";

const AddCourse = ({ active }) => {
  return (
    <div className={`${active ? "block" : "hidden"}`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl">
        <div className="bg-white p-10  rounded-2xl">
          <div className="text-center">
            <h2>Add New Course</h2>
            <div>Create a new course to organize your study schedule</div>
          </div>
          <label>Course Topic</label>
          <input
            type="text"
            placeholder="eg. Advanced Mathematics, Web Development"
          />
          <label>Project</label>
          <input
            type="text"
            placeholder="eg. Final Exam Preparation, Portfolio Website"
          />
          <label>Deadline</label>
          <input type="date" placeholder="" />
          <button className="bg-blue p-5 w-full">Add Course</button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
