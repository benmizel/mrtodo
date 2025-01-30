import { useState, useEffect } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/refresh-token`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setError("Authentication failed");
      } finally {
        setLoading(false);
      }
    };
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
      if (res.data.user) {
        setUser(res.data.user);
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
      if (res.data.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      setError("Signup failed");
    } finally {
        setSignupLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      setError("Logout failed");
    }
  };

  return {
    user,
    loading,
    error,
    login,
    signup,
    logout,
  };
};

export default useAuth;
