import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TaskItem.scss";
const API_URL = import.meta.env.VITE_API_URL;

const TaskItem = ({ task, fetchTasks }) => {
  let navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${task.user.accessToken}`,
        },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => navigate(`/tasks/edit/${task.id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TaskItem;
