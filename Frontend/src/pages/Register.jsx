import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error response
        if (response.status === 400) {
          setError({ general: data.detail });
        } else {
          setError({ general: "Registration failed. Please try again." });
        }
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
      console.error("Registration error:", err);
      setError({ general: "Network error. Please check your connection." });
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:p-5">
      <Link className="block" to="/">
        <img src={Logo} alt="Timinator Logo" />
      </Link>
      <form 
        onSubmit={handleSubmit}
        className="max-w-[500px] mx-auto bg-white rounded-xl flex flex-col gap-5 sm:p-14 p-5 mt-10"
      >
        {/* 1/3 - Back button */}
        <Link to="/" className="flex gap-4">
          <div>← Go back</div>
        </Link>

        {/* 2/3 - Title */}
        <h3>Create an account</h3>

        {/* 3/3 - Registration form */}
        <div>
          {/* General error message */}
          {error.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error.general}
            </div>
          )}

          <input 
            type="email" 
            placeholder="john@example.com" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
          {error.email && <small className="text-red-400">{error.email}</small>}

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
            placeholder="Password (min 6 characters)" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
          />
          {error.password && <small className="text-red-400">{error.password}</small>}

          <div>
            <button 
              type="submit" 
              className="w-full py-3 button1"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Register"}
            </button>
          </div>

          <div className="text-center">
            Already have an account? <br />
            <Link to="/login" className="font-semibold text-blue-400">
              Login here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;