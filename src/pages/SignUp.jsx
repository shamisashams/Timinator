import React from "react";
import Logo from "../assets/logo.svg";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="sm:p-5">
      <Link className=" block" to="/">
        <img src={Logo} alt="" />
      </Link>
      <form className="max-w-[500px] mx-auto bg-white rounded-xl flex flex-col gap-5 sm:p-14 p-5 mt-10">
        {/* 1/3 */}
        <Link to="/" className="flex gap-4">
          {/* <FontAwesomeIcon icon={faLongArrowLeft} className="text-2xl text-gray-700" /> */}
          <div>← Go back</div>
        </Link>

        {/* 2/3 */}

        <h3>Create an account</h3>
        {/* 3/3 */}
        <div>
          <input type="email" placeholder="john@example.com" name="email" />

          <input type="text" placeholder="John Doe" name="username" />

          <div>
            <button type="submit" className="w-full py-3 button1">
              Register
            </button>
          </div>
          <div className="text-center">
            Already have an account? <br />
            <Link to="/login" className="font-semibold text-blue-400">
              Login here
            </Link>
          </div>

          {/* {error.agreeTerms && (
            <small className="text-red-400">{error.agreeTerms}</small>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
