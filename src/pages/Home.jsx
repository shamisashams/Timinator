import { Link } from "react-router-dom";
import Clock from "../assets/icons/clock.svg";
import Note from "../assets/icons/note.svg";
import List from "../assets/icons/checklist.svg";

const Home = () => {
  const boxes = [
    {
      icon: Clock,
      title: "Smart scheduling",
      text: "create and manage study courses and projects easily",
    },
    {
      icon: List,
      title: "prioritize",
      text: "Focous on what matters most ",
    },
    {
      icon: Note,
      title: "Personalized Insights",
      text: "Get recommendations based on your past study patterns",
    },
  ];

  const steps = ["Add your tasks", "Track progress", "Complete Tasks"];

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
      <section className="flex justify-center items-stretch gap-12 p-10">
        {boxes.map((item, index) => {
          return (
            <div
              key={index}
              className="text-center w-92 p-8 border rounded-xl bg-white">
              <img className="m-auto" src={item.icon} alt="" />
              <p className="mt-2 mb-3">
                <strong>{item.title}</strong>
              </p>
              <div>{item.text}</div>
            </div>
          );
        })}
      </section>
      <section className="pb-20 pt-10">
        <h3 className="text-center">How It Works</h3>
        <div className="flex items-start justify-center gap-10 mt-10">
          {steps.map((text, index) => {
            return (
              <div key={index} className="text-center">
                <div className="w-10 h-10 rounded-full text-white bg-blue-400 flex items-center justify-center mx-auto mb-3">
                  <h3>{index + 1}</h3>
                </div>
                <div>{text}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
