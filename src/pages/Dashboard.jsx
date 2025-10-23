import { useState } from "react";
import Profile from "../components/Profile";
import TaskManagement from "../components/TaskManagement";
import AddCourse from "../components/AddCourse";
import TaskList from "../components/TaskList";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [active, setActive] = useState(0);
  const tabs = [
    "👤 Profile",
    "📚 Add course",
    "🖊️ Task Management",
    "📃 Task List",
  ];
  return (
    <div className="xl:pl-80 md:pl-72 min-h-screen">
      <div className="md:fixed md:top-0 md:left-0 md:h-screen bg-pink py-5 xl:px-10 px-6 text-center md:text-left">
        <Link className="md:mb-16 mb-10 block" to="/">
          <img src={Logo} alt="" />
        </Link>
        {tabs.map((item, index) => {
          return (
            <button
              onClick={() => setActive(index)}
              key={index}
              className={`md:block cursor-pointer md:py-4 md:px-10 p-2 md:w-full text-left mb-1 rounded-md hover:bg-white/[0.3] transition ${
                active == index ? "!bg-white" : ""
              }`}>
              {item}
            </button>
          );
        })}
      </div>
      <section className="flex items-start justify-center md:py-20 py-8">
        <Profile active={active == 0} />
        <AddCourse active={active == 1} />
        <TaskManagement active={active == 2} />
        <TaskList active={active == 3} />
      </section>
    </div>
  );
};

export default Dashboard;
