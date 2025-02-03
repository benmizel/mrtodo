import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import TaskList from "../../components/TaskList/TaskList";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, [authLoading, user, navigate]);

  return (
    <main className="dash">
      <h1 className="dash__welc">Welcome, {user?.username}!</h1>
      <button
        onClick={() => navigate("/tasks/add")}
        className="dash__add-task-button button"
      >
        + New Task
      </button>
      {loading && <div className="loader">Loading tasks...</div>}
      {error && (<div className="error-message">{error} <button className="retry-button button" onClick={fetchTasks}>Retry</button></div>)}
      {!loading && !error && <TaskList tasks={tasks} fetchTasks={fetchTasks} />}
    </main>
  );
};

export default Dashboard;
