// Authentication utility functions for the frontend

/**
 * Get the stored authentication token
 */
export const getAuthToken = () => {
  return localStorage.getItem("access_token");
};

/**
 * Get the stored user ID
 */
export const getUserId = () => {
  return localStorage.getItem("user_id");
};

/**
 * Get the stored username
 */
export const getUsername = () => {
  return localStorage.getItem("username");
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Logout user by clearing stored data
 */
export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
};

/**
 * Make an authenticated API request
 * @param {string} url - API endpoint URL
 * @param {object} options - Fetch options (method, body, etc.)
 */
export const authenticatedFetch = async (url, options = {}) => {
  const token = getAuthToken();
  
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If unauthorized, clear auth data and redirect to login
  if (response.status === 401) {
    logout();
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
};