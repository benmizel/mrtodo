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
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
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

      setTasks(res.data);
      setFilteredTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  useEffect(() => {
    let filtered = tasks;

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    setFilteredTasks(filtered);
  }, [priorityFilter, statusFilter, tasks]);

  const handleGoToLogin = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className="dash">
      <h1 className="dash__welc">Welcome, {user?.username}!</h1>
      <button
        onClick={() => navigate("/tasks/add")}
        className="dash__add-task-button button"
      >
        + New Task
      </button>
      <div className="filter-controls">
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Statuses</option>
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {error && (
        <div className="error-message task-list-token-error">
          {error}{" "}
          <button className="retry-button button" onClick={handleGoToLogin}>
            Go To Login Page
          </button>
        </div>
      )}
      {!loading && !error && (
        <TaskList tasks={filteredTasks} fetchTasks={fetchTasks} />
      )}
    </main>
  );
};

export default Dashboard;
