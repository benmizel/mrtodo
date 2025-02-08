import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const checkToken = () => {
    return (
      localStorage.getItem("accessToken") 
    );
  };

  const refreshToken = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);

      }
      if (res.data.user) {
        setUser(res.data.user);

      }
      
    } catch (err) {
      console.error("Error refreshing token:", err);
      setError("Token refresh failed");
      setUser(null);
    }
  };

  const checkAuth = async () => {
    if (!checkToken()) {
      setLoading(false);
      setUser(null);
      return;
    }
  
    try {
      await refreshToken();
    } catch (err) {
      setError("Authentication failed");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username, password) => {
    setAuthLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/auth/login`,
        { username, password },
        { withCredentials: true }
      );

      console.log("Login response:", res);

      if (res.data.user) {
        setUser(res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
      }
    } catch (err) {
      setError("Login failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (username, password) => {
    setSignupLoading(true);
    try {
      const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
      const passwordRegex =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d@$!%*?&]{8,}$/;

      if (!usernameRegex.test(username)) {
        setError(
          "Username must be alphanumeric and between 3 and 30 characters."
        );
        setSignupLoading(false);
        return;
      }

      if (!passwordRegex.test(password)) {
        setError(
          "Password must contain at least 8 characters, one letter, one number, one special character, and one uppercase letter."
        );
        setSignupLoading(false);
        return;
      }
      const res = await axios.post(`${API_URL}/auth/signup`, {
        username,
        password,
      });

      if (res.status === 201) {
        await login(username, password);
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError("Signup failed");
    } finally {
      setSignupLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("accessToken");
    setUser(null); 
  };

  const deleteAccount = async () => {
    try {
      await axios.delete(`${API_URL}/user`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (err) {
      setError("Account deletion failed");
      return err;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    deleteAccount,
    checkAuth,
  };
};

export default useAuth;
