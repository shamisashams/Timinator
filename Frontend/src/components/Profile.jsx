import React from "react";
import { useEffect, useState } from "react";
import EditProfile from "./EditProfile";

// --- CONFIGURATION ---
const API_BASE_URL = "http://127.0.0.1:8000"; // IMPORTANT: Ensure your FastAPI is running here
const USER_ID = "demo-user-123"; // IMPORTANT: Must match the ID used in FastAPI routes

const Profile = ({ active }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(
    {
      id: USER_ID,
      first_name : "",
      last_name:"",
      age: null,
      degree: "",
      university: "",
      field_of_study: "",
      current_semester: "",
      primary_study_goals:"",
      preferred_study_time:"",
    }
  )
  useEffect(()=>{fetchProfileData()},[])

  const fetchProfileData = async () => {
    try { 
      // 1. Send the GET request
      const response = await fetch(`${API_BASE_URL}/api/user/profile/${USER_ID}`);
  
      // Basic error check for HTTP status codes (e.g., 404, 500)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // 2. Convert the response body from JSON string to a JavaScript object
      const data = await response.json();
  
      // 3. Update the state with the received data
      setProfileData(data);
      } catch (error) {
      console.error("Could not fetch profile data:", error);
      // You might also set an 'error' state here to display a message to the user
     }
  };
  function handelCompleteEditing(){
    setIsEditing(false)
    fetchProfileData()
  }

  return (
    <div className={`${active ? "block" : "hidden"} w-full`}>
      {!isEditing ? (
        <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl  mx-auto">
          <div className=" bg-white p-5 pb-10 rounded-2xl ">
            <div className="text-center mb-10">
              <h3>Your Timinator Profile</h3>
              <img
                className="w-20 h-20 m-auto"
                src="./src/assets/icons/profileUser.svg"
              />
            </div>
            <p className="ml-6 font-semibold mb-2">
              Personal and Academic Information
            </p>
            <hr className="mb-4" />
            <div className="grid grid-cols-2 gap-3 mb-4">
               <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Full Name</p>
                 <p className="font-medium text-gray-800">{profileData.first_name} {profileData.last_name}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Age</p>
                 <p className="font-medium text-gray-800">{profileData.age}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">University</p>
                 <p className="font-medium text-gray-800">{profileData.university}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Field of study</p>
                 <p className="font-medium text-gray-800">{profileData.field_of_study}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Degree</p>
                 <p className="font-medium text-gray-800">{profileData.degree}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
                <p className="text-xs text-gray-500">Current Semester</p>
                 <p className="font-medium text-gray-800">{profileData.current_semester}</p>
              </div>
            </div>
            <p className="ml-6 font-semibold text-gray-700 mb-2">
              Study Preferences
            </p>
            <hr className="mb-4" />

            <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
            <p className="ml-6 font-normal text-gray-600 mb-2">
               Primary Study Goals: {profileData.primary_study_goals}
            </p>
            <p className="ml-6 font-normal text-gray-600 mb-2">
              Preferred Study Time: {profileData.preferred_study_time}
            </p>
            </div>

            {/* Edit Button */}
            <div className="text-center">
              <button
                onClick={() => setIsEditing(true)}
                className=" mt-6 w-full max-w-50 py-2 rounded-lg bg-gradient ">
                ✏️ Edit Profile
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EditProfile
          activeSet={isEditing}
          onComplete={handelCompleteEditing}
          initialData = {profileData}
        />
      )}
    </div>
  );
};


export default Profile;
