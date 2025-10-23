import React from "react";

const Profile = ({ active }) => {
  return (
    <div className={`${active ? "block" : "hidden"} w-full`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl  mx-auto">
        <div className="bg-white p-5 pb-10 rounded-2xl "></div>
      </div>
    </div>
  );
};

export default Profile;
