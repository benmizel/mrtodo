import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./Home.scss";

const Home = () => {
  const { user, loading, checkAuth } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (user) {
        navigate("/dashboard", { replace: true });
      }
    };
    if (!loading) {
      verifyAuth();
    }
  }, [checkAuth]);

  if (loading) {
    return <div className="homepage-loading loading">Loading...</div>;
  }

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <main className="homepage">
      <h1 className="homepage__welcome">Welcome to Mr. To Do!</h1>
      <h2 className="homepage__desc">Your Personal Task Manager App</h2>
      <h3 className="homepage__prompt">Please login or sign up below:</h3>
      <div className="button-cont">
        <button className="homepage__login button" onClick={handleLoginClick}>
          Login
        </button>
        <button className="homepage__signup button" onClick={handleSignupClick}>
          Sign Up
        </button>
      </div>
    </main>
  );
};

export default Home;
