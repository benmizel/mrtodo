import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import "./EditTask.scss";
const API_URL = import.meta.env.VITE_API_URL;

const EditTask = () => {
  const { user, loading: authLoading, checkAuth } = useAuth();
  const { taskId } = useParams();
  const [authChecked, setAuthChecked] = useState(false);
  const [singleTask, setSingleTask] = useState({
    title: "",
    description: "",
    status: "not started",
    priority: "low",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        fetchTaskById();
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [authChecked, user]);

  const fetchTaskById = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSingleTask(response.data[0]);
    } catch (err) {
      setError("Failed to fetch task details.");
      console.error("Error fetching task:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, [user]);

  return (
    <main className="edit-task-page">
      <h1 className="edit-task-page__heading">Edit Task</h1>
      <EditTaskForm singleTask={singleTask} />
    </main>
  );
};

export default EditTask;
