import React from "react";

const Profile = ({ active }) => {
  return (
    <div className={`${active ? "block" : "hidden"}`}>
      <div className="bg-gradient border-3 border-transparent max-w-3xl rounded-2xl">
        <div className="bg-white p-10  rounded-2xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
          asperiores hic, consectetur minus totam architecto quis iusto, eos
          voluptatum tempore adipisci, doloribus error aspernatur iure. Aperiam
          eligendi nulla quisquam animi!
        </div>
      </div>
    </div>
  );
};

export default Profile;
