import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import "./AddTask.scss";

const AddTask = () => {
  const { user, loading, checkAuth } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
      if (user) {
        navigate("/tasks/add", { replace: true });
      }
    };
    verifyAuth();
  }, []);

  useEffect(() => {
    if (authChecked) {
      if (!user) {
        navigate("/", { replace: true });
      }
    }
  }, [authChecked, user, navigate]);

  // if (loading) return <div className="add-task-loading loading">Loading...</div>;

  return (
    <main className="add-task-page">
      <h1 className="add-task-page__heading">Create a New Task</h1>
      <AddTaskForm />
    </main>
  );
};

export default AddTask;
