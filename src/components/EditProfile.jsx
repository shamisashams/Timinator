import React from "react";
import { useEffect, useState } from "react";

const EditProfile= ({activeSet, onComplete, initialData})=> {
  const [formData, setFormData]=useState(initialData)

  useEffect(()=>{
    setFormData(initialData)
  },[initialData])

  function handelChange(e){
    const {name,value}= e.target 
    setFormData(prev =>({
      ...prev,
      [name]: value
    }) )
  }
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
                  placeholder="saji"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handelChange}
                  className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="jon"
                  name="lirstName"
                  value={formData.lastName}
                  onChange={handelChange}
                  className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  age
                </label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  name="age"
                  value={formData.age}
                  onChange={handelChange}
                  className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Degree
                </label>
                <input
                  type="text"
                  placeholder="Enter your degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handelChange}
                  className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                University
              </label>
              <input
                type="text"
                placeholder="Enter your university name"
                name="university"
                value={formData.university}
                onChange={handelChange}
                className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Field of Study
              </label>
              <input
                type="text"
                placeholder="e.g. Computer Science, Biology, Psychology"
                name="fieldOfStudy"
                value={formData.fieldOfStudy}
                onChange={handelChange}
                className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Current Semester
              </label>
              <select className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200">
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
            <h3 className="text-lg font-semibold text-gray-800 mt-6">
              Study Preferences
            </h3>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Primary Study Goals
              </label>
              <input
                type="text"
                placeholder="e.g. Exam prepration"
                name="primaryStudyGoals"
                value={formData.primaryStudyGoals}
                onChange={handelChange}
                className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Preferred Study Time
              </label>
              <input
                type="text"
                placeholder="e.g. Afternoon, Night"
                name="preferredStudyTime"
                value={formData.preferredStudyTime}
                onChange={handelChange}
                className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              onClick={onComplete}
              className="mt-6 w-full py-2 rounded-lg bg-gradient font-bold">
              Complete Profile Setup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
