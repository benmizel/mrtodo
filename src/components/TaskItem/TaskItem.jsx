import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../DeleteModal/DeleteModal";
import editIcon from "../../assets/icons/edit-24px.svg";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import "./TaskItem.scss";
const API_URL = import.meta.env.VITE_API_URL;

const TaskItem = ({ task, fetchTasks }) => {
  const { taskId } = useParams();
  let navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios.delete(`${API_URL}/task/delete/${task.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
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

  const priorityClass = (priority) => {
    if (priority === "low") {
      return "low-priority";
    } else if (priority === "medium") {
      return "medium-priority";
    } else {
      return "high-priority";
    }
  };

  const statusClass = (status) => {
    if (status === "not started") {
      return "not-started-status";
    } else if (status === "pending") {
      return "pending-status";
    } else {
      return "completed-status";
    }
  };

  return (
    <li className="task-card">
      <h3 className="task-card__title">{task.title}</h3>
      <p className="task-card__desc">{task.description}</p>
      <div className="priority-status-cont">
      <p className={`task-card__priority ${priorityClass(task.priority)}`}>Priority: {task.priority.toUpperCase()}</p>
      <p className={`task-card__status ${statusClass(task.status)}`}>Status: {task.status.toUpperCase()}</p>
      </div>
      <div className="task-button-cont">
      <img src={editIcon} alt="Edit Task" className="task-card__icon task-card__edit-icon" aria-label={`Edit task: ${task.title}`}
        onClick={handleEditClick}
      />
      <img src={deleteIcon} alt="Delete Task" className="task-card__icon task-card__delete-icon" aria-label={`Delete task: ${task.title}`}
        onClick={handleDeleteClick}
      />
      </div>
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
