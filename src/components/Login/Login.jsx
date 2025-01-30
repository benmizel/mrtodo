import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password);
    if (user) {
      navigate("/dashboard");
    }
  };
  return (
    <main className="login">
      <h2 className="login__title">Login</h2>
      <form className="login__form" id="login-form" onSubmit={handleLogin}>
        <div className="login-user-cont">
          <label
            htmlFor="login-user"
            className="login-user-cont__username form-label"
          >
            Username
          </label>
          <input
            className="login-user-cont__input form-input"
            id="login-user"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="login-pass-cont">
          <label
            htmlFor="login-pass"
            className="login-pass-cont__password form-label"
          >
            Password
          </label>
          <input className="login-pass-cont__input form-input"
            id="login-pass"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button button" type="submit">
          Login
        </button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
};

export default Login;
