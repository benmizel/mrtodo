import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import EditTaskForm from "../EditTaskForm/EditTaskForm";
import './EditTask.scss';

const EditTask = () => {
  const { user, loading, checkAuth } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      if (!user) {
        navigate("/", { replace: true });
      }
    };
    verifyAuth();
  }, [user, loading, navigate, checkAuth]);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="edit-task-page">
      <h1 className="edit-task-page__heading">Edit Task</h1>
      <EditTaskForm />
    </main>
  );
};

export default EditTask;
