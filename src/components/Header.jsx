import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="flex justify-between items-center gap-10 py-4 px-20">
      <Link to="/">
        <img src={Logo} alt="" />
      </Link>
      <Link to="/" className="py-3 px-20 rounded-2xl bg-gradient">
        <strong>Log in / Sign up</strong>{" "}
      </Link>
    </div>
  );
};

export default Header;
