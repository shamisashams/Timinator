import React from "react";

const EditProfile = ({ activeSet,onComplete }) => {
  return (
    <div className={`${activeSet ? "block" : "hidden"} w-full`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl  mx-auto">
        <div className="bg-white p-5 pb-10 rounded-2xl ">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex flex-col items-center justify-center text-gray-500 text-2xl border border-gray-200">
              <span>+</span>
              <span className="text-xs font-medium">Add Photo</span>
            </div>
            <button className="text-sm text-purple-400 mt-2 hover:text-purple-500">
              Choose Photo
            </button>
          </div>
          
          {/* Form Fields */}
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science, Biology, Psychology"
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science, Biology, Psychology"
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Year of Study
                </label>
                <select className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200">
                  <option>Select year</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                University
              </label>
              <input
                type="text"
                placeholder="Enter your university name"
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science, Biology, Psychology"
                className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Current Semester
              </label>
              <select className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200">
                <option>Select semester</option>
                <option>1st Semester</option>
                <option>2nd Semester</option>
                <option>3rd Semester</option>
                <option>4th Semester</option>
                <option>5th Semester</option>
                <option>6th Semester</option>
              </select>
            </div>

            {/* Study Preferences */}
            <h2 className="text-lg font-semibold text-gray-800 mt-6">
              Study Preferences
            </h2>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Primary Study Goals
              </label>
              <select className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200">
                <option>Select your main goal</option>
                <option>Exam Preparation</option>
                <option>Skill Improvement</option>
                <option>Research</option>
                <option>Assignment Work</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Preferred Study Time
              </label>
              <select className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-200">
                <option>Select preferred time</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
                <option>Night</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={onComplete}
              className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-pink-300 to-blue-300 text-gray-800 font-medium shadow-md hover:opacity-90 transition"
            >
              Complete Profile Setup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
