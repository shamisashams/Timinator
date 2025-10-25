import React from "react";
import { useState } from "react";
import EditProfile from "../components/EditProfile";

const Profile = ({ active }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className={`${active ? "block" : "hidden"} w-full`}>
      {!isEditing ?(
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl  mx-auto">
        <div className=" bg-white p-5 pb-10 rounded-2xl ">
          <div className="text-center mb-10">
          <h2>Your Timinator Profile</h2>
          <img className="w-20 h-20 m-auto" src="./src/assets/icons/profileUser.svg"/>
          </div>
          <p className="ml-6 font-semibold mb-2">
          Personal and Academic Information
          </p>
          <hr className="mb-4" />
          <div className="grid grid-cols-2 gap-3 mb-4">
          <ProfileField label="Full Name" value="..." />
          <ProfileField label="Age" value="..." />
          <ProfileField label="University" value="..." />
          <ProfileField label="Field of study" value="..." />
          <ProfileField label="Degree" value="..." />
          <ProfileField label="Current Semester" value="..." />
          </div>
          <p className="ml-6 font-semibold text-gray-700 mb-2">
          Study Preferences
          </p>
          <hr className="mb-4" />

          <div className="bg-gray-50 p-3 rounded-lg text-gray-700">
            I enjoy studying artificial intelligence and full-stack development.
          </div>

          {/* Edit Button */}
          <div className="text-center">
          <button
            onClick={() => setIsEditing(true)}
            className=" mt-6 w-full max-w-50 py-2 rounded-lg bg-gradient-to-r from-pink-300 to-blue-300 text-gray-800 font-medium shadow-md"
          >
            ✏️ Edit Profile
          </button>
          </div>
          
        </div>
      </div>
      ) : (
        <EditProfile activeSet={isEditing} onComplete={() => setIsEditing(false)} />
      )}
    </div>
  );
};

function ProfileField({ label, value }) {
  return (
    <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}
export default Profile;
