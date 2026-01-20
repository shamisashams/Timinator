import React from "react";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://127.0.0.1:8000"; 
const USER_ID = "demo-user-123"; 

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
  const handelSave = async(e)=>{
    e.preventDefault();
    const payload = { ...formData, id: USER_ID }; 
    try {
      // 1. Send the PUT request to the FastAPI endpoint
      const response = await fetch(`${API_BASE_URL}/api/user/profile/${USER_ID}`, {
        method: 'PUT', // Use PUT to replace the whole profile record
        headers: {
          'Content-Type': 'application/json',
          // If authentication were involved, you'd add the Auth header here
        },
        // 2. Convert the local form state (formData) into a JSON string
        body: JSON.stringify(payload), 
      });
  
      // 3. Check for successful HTTP status codes (200-299)
      if (response.ok) {
        // 4. Handle Success (The crucial Re-fetch step - explained next)
        // We assume the back-end has successfully saved the data.
        onComplete(); // This is a new function/prop we need to define/pass down.
      } else {
        // Handle server-side validation errors (e.g., 422 Unprocessable Entity)
        const errorData = await response.json();
        console.error("Failed to save profile:", errorData);
        // Display a message to the user about the failure
        alert(`Error saving profile: ${JSON.stringify(errorData.detail || errorData)}`);
      }
    } catch (error) {
      console.error("Network or parsing error during save:", error);
      // Display a message for network issues
      alert(`Network Error: Could not connect to the API at ${API_BASE_URL}.`);
    }
  };

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
          <form onSubmit={handelSave} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="saji"
                  name="first_name"
                  value={formData.first_name}
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
                  name="last_name"
                  value={formData.last_name}
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
                name="field_of_study"
                value={formData.field_of_study}
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
                name="primary_study_goals"
                value={formData.primary_study_goals}
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
                name="preferred_study_time"
                value={formData.preferred_study_time}
                onChange={handelChange}
                className="rounded-lg p-2 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Submit Button */}
            <button
              className="mt-6 w-full py-2 rounded-lg bg-gradient font-bold"
              type="submit">
              Complete Profile Setup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
