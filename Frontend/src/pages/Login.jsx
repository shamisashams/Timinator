import Google from "../assets/icons/google.jpeg";
import FB from "../assets/icons/fb.jpg";
import Apple from "../assets/icons/apple.webp";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Login = () => {
  return (
    <div className="sm:p-5">
      <Link className=" block" to="/">
        <img src={Logo} alt="" />
      </Link>
      <div className="sm:p-5 flex justify-center gap-4">
        <form className="flex flex-col gap-8 bg-white sm:p-14 p-5 rounded-xl sm:min-w-sm min-w-full">
          {/* 1/5 */}
          <Link to="/" className="flex gap-4">
            {/* <FontAwesomeIcon icon={faLongArrowLeft} className="text-2xl text-gray-700" /> */}
            <div>← Go back</div>
          </Link>

          {/* 2/5 */}
          <div>
            <h3>Welcome to Timinator</h3>
          </div>

          {/* 3/5 */}
          <div className="">
            {/* Google */}
            <div className="mb-2 flex items-center justify-center gap-2 py-2 border rounded border-solid">
              <div className="flex items-center justify-center w-8 h-8">
                <img src={Google} alt="Google Logo" />
              </div>
              <div>Continue with Google</div>
            </div>

            {/* Yahoo */}
            <div className="mb-2 flex items-center justify-center gap-2 py-2 border rounded border-solid">
              <div className="flex items-center justify-center w-8 h-8">
                <img src={FB} alt="Facebook Logo" />
              </div>
              <div>Continue with Facebook</div>
            </div>

            {/* Apple */}
            <div className="flex items-center justify-center gap-2 py-2 border rounded border-solid">
              <div className="flex items-center justify-center w-8 h-8">
                <img src={Apple} alt="Apple Logo" />
              </div>
              <div>Continue with Apple</div>
            </div>
          </div>

          {/* 4/5 */}
          <div>
            <div className="w-full border-b mb-7">
              <div className="text-center -mb-4 bg-white w-fit mx-auto p-2">
                or
              </div>
            </div>

            <div>
              <input type="text" placeholder="Username" name="username" />
              {/* {error.username && <small className="text-red-400">{error.username}</small>} */}

              <input type="password" name="password" placeholder="Password" />
              {/* {error.password && <small className="text-red-400">{error.password}</small>} */}

              <button type="submit" className="w-full py-3 bg-blue mb-5">
                Sign in
              </button>

              <div className="text-center">
                Don't have an account yet? <br />
                <Link to="/signup" className="font-semibold text-blue-400">
                  Sign up here
                </Link>
              </div>
            </div>
          </div>
        </form>
        {/* <img src={imgs[0]} className="md:inline hidden w-[500px] bg-white rounded-2xl " /> */}
      </div>
    </div>
  );
};

export default Login;
