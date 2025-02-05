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

  // const checkAuth = async () => {
  //   if (!checkToken()) {
  //     setLoading(false);
  //     setUser(null);
  //     return;
  //   }
  //   try {
  //     const res = await axios.post(
  //       `${API_URL}/auth/refresh-token`,
  //       {},
  //       {
  //         withCredentials: true,
  //       }
  //     );
  //     if (res.data.user) {
  //       console.log("User authenticated:", res.data.user);
  //       setUser(res.data.user);
  //     }
  //     if (res.data.accessToken) {
  //       localStorage.setItem("accessToken", res.data.accessToken);
  //     }
  //     // setUser(res.data.user);
  //   } catch (err) {
  //     setError("Authentication failed");
  //     setUser(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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

  // const checkAuth = async () => {
  //   // Check if accessToken exists in localStorage
  //   const accessToken = checkToken();

  //   if (!accessToken) {
  //     // If there's no accessToken, attempt to refresh
  //     console.log("No access token found, attempting to refresh.");

  //     await refreshToken(); // Try to refresh the token

  //     // After attempting to refresh, check if we still don't have an accessToken
  //     if (!localStorage.getItem("accessToken")) {
  //       console.log("Refresh failed, user must log in again.");
  //       setLoading(false);
  //       setUser(null); // If no accessToken, the user is not authenticated
  //       return;
  //     }

  //     // If we successfully got a new access token, authenticate the user
  //     console.log("User successfully authenticated via refresh.");
  //     setLoading(false);
  //     return;
  //   }

  //     setLoading(false);
  //     return;

  // };

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
      // if (res.data.user) {
      //   setUser(res.data.user);
      // }
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
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      setError("Logout failed");
      return err;
    }
  };

  const deleteAccount = async () => {
    try {
      await axios.delete(`${API_URL}/auth/delete`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (err) {
      setError("Account deletion failed");
      return err;
    }
  };

  // useEffect(() => {
  //   console.log("User state updated in useAuth:", user); // Log whenever user changes
  // }, [user]);

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
