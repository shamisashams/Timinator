import React from "react";

const AddCourse = ({ active }) => {
  return (
    <div className={`${active ? "block" : "hidden"} w-full`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl  mx-auto">
        <div className="bg-white p-5 pb-10 rounded-2xl ">
          <div className="text-center mb-10">
            <h2>Add New Course</h2>
            <div className="opacity-50">
              Create a new course to organize your study schedule
            </div>
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
          <button className="bg-blue p-5 w-full font-bold mt-6">
            Add Course
          </button>
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 mt-10 gap-4">
            {/* course box */}
            <div className="bg-green-50 p-4">
              <p>
                <b>Course Name</b>
              </p>
              <div>Project</div>
              <div>Deadline: 10.12.2026</div>
              <button className="block bg-red-300 p-2 font-bold text-xs mx-auto mr-0 mt-4 cursor-pointer">
                Delete course
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
