import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="relative flex justify-between items-center sm:gap-10 gap-8 py-4 xl:px-20 sm:px-5 z-9">
      <Link to="/">
        <img src={Logo} alt="" />
      </Link>
      <Link
        to="/dashboard"
        className="py-3 md:px-10 px-5 rounded-2xl bg-gradient whitespace-nowrap">
        <strong>Sign In</strong>{" "}
      </Link>
    </div>
  );
};

export default Header;
