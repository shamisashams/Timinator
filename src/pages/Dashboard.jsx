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
    <div className="pl-80 min-h-screen">
      <div className="fixed top-0 left-0 h-screen bg-pink py-5 px-10">
        <Link className="mb-16 block" to="/">
          <img src={Logo} alt="" />
        </Link>
        {tabs.map((item, index) => {
          return (
            <button
              onClick={() => setActive(index)}
              key={index}
              className={`block cursor-pointer py-4 px-10 w-full text-left mb-1 rounded-md hover:bg-white/[0.3] transition ${
                active == index ? "!bg-white" : ""
              }`}>
              {item}
            </button>
          );
        })}
      </div>
      <section className="flex items-start justify-center pt-20">
        <Profile active={active == 0} />
        <AddCourse active={active == 1} />
        <TaskManagement active={active == 2} />
        <TaskList active={active == 3} />
      </section>
    </div>
  );
};

export default Dashboard;
