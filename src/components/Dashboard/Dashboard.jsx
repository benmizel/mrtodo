import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import TaskList from "../../components/TaskList/TaskList";
import { useNavigate } from "react-router-dom";
import "./Dashboard.scss";
const API_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const { user, loading: authLoading, checkAuth } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };

    if (!authLoading) {
      verifyAuth();
    }

  }, []);


  useEffect(() => {
    if (authChecked) {
      if (user && user.accessToken) {
        fetchTasks(); 
      } else {
        navigate("/", { replace: true }); 
      }
    }
  }, [authChecked, user]);

  const fetchTasks = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("No access token available. Cannot fetch tasks.");
      setError("No access token available. Please log in again.");
      return;
    }    
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/task`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Fetching tasks...");
    fetchTasks();
  }, [user]);


  return (
    <main className="dash">
      <h1 className="dash__welc">Welcome, {user?.username}!</h1>
      <button
        onClick={() => navigate("/tasks/add")}
        className="dash__add-task-button button"
      >
        + New Task
      </button>
      {error && (
        <div className="error-message">
          {error}{" "}
          <button className="retry-button button" onClick={fetchTasks}>
            Retry
          </button>
        </div>
      )}
      {!loading && !error && <TaskList tasks={tasks} fetchTasks={fetchTasks} />}
    </main>
  );
};

export default Dashboard;
