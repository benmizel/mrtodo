import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal";
import editIcon from "../../assets/icons/edit-24px.png";
import deleteIcon from "../../assets/icons/delete_outline-24px.png";
import "./TaskItem.scss";
const API_URL = import.meta.env.VITE_API_URL;

const TaskItem = ({ task, fetchTasks }) => {
  let navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/tasks/${task.id}`, {
        headers: {
          Authorization: `Bearer ${task.user.accessToken}`,
        },
      });
      fetchTasks();
      setDeleteModalOpen(false);
    } catch (err) {
        setDeleteError("Failed to delete the task. Please try again.");
      console.error("Error deleting task:", err);
    }
  };
  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setDeleteError(null);
  };

  const handleEditClick = () => {
    navigate(`/tasks/edit/${task.id}`);
  };

  return (
    <li className="task-card">
      <h3 className="task-card__title">{task.title}</h3>
      <p className="task-card__desc">{task.description}</p>
      <p className="task-card__priority">Priority: {task.priority}</p>
      <p className="task-card__status">Status: {task.status}</p>
      <img src={editIcon} alt="Edit Task" className="task-card__icon task-card__edit-icon" aria-label={`Edit task: ${task.title}`}
        onClick={handleEditClick}
      />
      <img src={deleteIcon} alt="Delete Task" className="task-card__icon task-card__delete-icon" aria-label={`Delete task: ${task.title}`}
        onClick={handleDeleteClick}
      />
      {deleteError && <div className="error-message">{deleteError}</div>}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onRequestClose={handleCancelDelete}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this task? This action cannot be undone."
        title="Delete Task"
      />
    </li>
  );
};

export default TaskItem;
