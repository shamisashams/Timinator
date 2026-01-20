import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Google from "../assets/icons/google.jpeg";
import FB from "../assets/icons/fb.jpg";
import Apple from "../assets/icons/apple.webp";
import Logo from "../assets/logo.svg";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error for this field when user starts typing
    if (error[e.target.name]) {
      setError({
        ...error,
        [e.target.name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setIsLoading(true);

    // Basic validation
    if (!formData.username.trim()) {
      setError({ username: "Username is required" });
      setIsLoading(false);
      return;
    }
    if (!formData.password) {
      setError({ password: "Password is required" });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response
        setError({ general: data.detail || "Login failed. Please try again." });
        setIsLoading(false);
        return;
      }

      // Store token and user info in localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_id", data.user_id);
      localStorage.setItem("username", data.username);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError({ general: "Network error. Please check your connection." });
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:p-5">
      <Link className="block" to="/">
        <img src={Logo} alt="Timinator Logo" />
      </Link>
      <div className="sm:p-5 flex justify-center gap-4">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 bg-white sm:p-14 p-5 rounded-xl sm:min-w-sm min-w-full"
        >
          {/* 1/5 - Back button */}
          <Link to="/" className="flex gap-4">
            <div>← Go back</div>
          </Link>

          {/* 2/5 - Title */}
          <div>
            <h3>Welcome to Timinator</h3>
          </div>

          {/* 3/5 - Social login buttons (currently non-functional) */}
          <div className="">
            <div className="mb-2 flex items-center justify-center gap-2 py-2 border rounded border-solid cursor-not-allowed opacity-50">
              <div className="flex items-center justify-center w-8 h-8">
                <img src={Google} alt="Google Logo" />
              </div>
              <div>Continue with Google</div>
            </div>

            <div className="mb-2 flex items-center justify-center gap-2 py-2 border rounded border-solid cursor-not-allowed opacity-50">
              <div className="flex items-center justify-center w-8 h-8">
                <img src={FB} alt="Facebook Logo" />
              </div>
              <div>Continue with Facebook</div>
            </div>

            <div className="flex items-center justify-center gap-2 py-2 border rounded border-solid cursor-not-allowed opacity-50">
              <div className="flex items-center justify-center w-8 h-8">
                <img src={Apple} alt="Apple Logo" />
              </div>
              <div>Continue with Apple</div>
            </div>
          </div>

          {/* 4/5 - Login form */}
          <div>
            <div className="w-full border-b mb-7">
              <div className="text-center -mb-4 bg-white w-fit mx-auto p-2">
                or
              </div>
            </div>

            <div>
              {/* General error message */}
              {error.general && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error.general}
                </div>
              )}

              <input 
                type="text" 
                placeholder="Username" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
              />
              {error.username && <small className="text-red-400">{error.username}</small>}

              <input 
                type="password" 
                name="password" 
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              {error.password && <small className="text-red-400">{error.password}</small>}

              <button 
                type="submit" 
                className="w-full py-3 bg-blue mb-5"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>

              <div className="text-center">
                Don't have an account yet? <br />
                <Link to="/register" className="font-semibold text-blue-400">
                  Sign up here
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;