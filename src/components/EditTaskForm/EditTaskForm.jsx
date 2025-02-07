import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditTaskForm.scss";

const API_URL = import.meta.env.VITE_API_URL;

const EditTaskForm = ({ singleTask }) => {
  const { taskId } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadedTask, setLoadedTask] = useState(singleTask);
  const navigate = useNavigate();

  useEffect(() => {
    if (singleTask) {
      setLoadedTask(singleTask);
    }
  }, [singleTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoadedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/task/update/${taskId}`, loadedTask, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-task-form-cont">
      {error && <div className="error-message">{error}</div>}
      <form
        className="edit-task-form"
        id="edit-task-form"
        onSubmit={handleSubmit}
      >
        <div className="edit-task-title-cont">
          <label
            className="edit-task-title-cont__title form-label"
            htmlFor="title"
          >
            Task Title:
          </label>
          <input
            type="text"
            className="edit-task-title-cont__input form-input"
            id="title"
            name="title"
            value={loadedTask.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-task-desc-cont">
          <label
            className="edit-task-desc-cont__desc form-label"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="edit-task-desc-cont__input form-text-area"
            id="description"
            name="description"
            value={loadedTask.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="edit-task-priority-cont">
          <label
            className="edit-task-priority-cont__priority form-label"
            htmlFor="priority"
          >
            Priority:
          </label>
          <select
            className="edit-task-priority-cont__input form-option"
            id="priority"
            name="priority"
            value={loadedTask.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="edit-task-status-cont">
          <label
            className="edit-task-status-cont__status form-label"
            htmlFor="status"
          >
            Status:
          </label>
          <select
            className="edit-task-status-cont__input form-option"
            id="status"
            name="status"
            value={loadedTask.status}
            onChange={handleChange}
          >
            <option value="not started">Not Started</option>
            <option value="in-progress">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="edit-task-button-cont">

        <button
          className="edit-task-button button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Updating Task..." : "Update Task"}
        </button>
        <button
          className="edit-task-cancel-button button"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskForm;
