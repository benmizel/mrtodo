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
    };
    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authChecked) {
      if (!user) {
        navigate("/", { replace: true });
      }
    }
  }, [authChecked, user, navigate]);


  return (
    <main className="add-task-page">
      <h1 className="add-task-page__heading">Create a New Task</h1>
      <AddTaskForm />
    </main>
  );
};

export default AddTask;
