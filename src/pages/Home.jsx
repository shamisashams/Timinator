import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <section className="max-w-3xl mx-auto text-center py-20">
        <h1 className="text-gradient">Plan smarter, not harder</h1>
        <p className="mt-5 mb-10">
          {" "}
          Stay ahead of your goals with a smart study planner that adapts to you
          — organize your schedule, track your progress, and receive
          personalized task recommendations built around your learning habits.
        </p>
        <Link
          to="/"
          className="bg-gradient rounded-full py-3 px-12 font-bold block w-fit mx-auto ">
          <p> Get started</p>
        </Link>
      </section>
    </div>
  );
};

export default Home;
