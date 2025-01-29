import { useNavigate } from "react-router-dom";

import "./Home.scss";

const Home = () => {
  let navigate = useNavigate();

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
            <button className="homepage__login button" onClick={handleLoginClick}>Login</button>
            <button className="homepage__signup button" onClick={handleSignupClick}>Sign Up</button>
        </div>
    </main>

  );
};

export default Home;
