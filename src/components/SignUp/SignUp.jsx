import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

import "./SignUp.scss";

const SignUp = () => {
  const { signup, user, error, signupLoading } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    await signup(username, password);
    // navigate("/dashboard");
    // console.log("After signup, user is:", user);
  };

  useEffect(() => {
    console.log("User updated:", user);
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  return (
    <main className="signup">
      <h2 className="signup__title">Sign Up</h2>
      <form className="signup__form" id="signup-form" onSubmit={handleSignUp}>
        <div className="signup-user-cont">
          <label
            htmlFor="signup-user"
            className="signup-user-cont__username form-label"
          >
            Username
          </label>
          <input
            className="signup-user-cont__input form-input"
            id="signup-user"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="signup-pass-cont">
          <label
            htmlFor="signup-pass"
            className="signup-pass-cont__password form-label"
          >
            Password
          </label>
          <input
            className="signup-pass-cont__input form-input"
            id="signup-pass"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button className="signup-button button" type="submit">
          Sign Up
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {signupLoading && <p className="loading-message">Signing up...</p>}
    </main>
  );
};

export default SignUp;
