import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddTaskForm.scss";

const API_URL = import.meta.env.VITE_API_URL;

const AddTaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "not started",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/task/add`, task, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to add task. Please try again.");
      console.error("Error adding task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task-form-cont">
      {error && <div className="error-message">{error}</div>}
      <form
        className="add-task-form"
        id="add-task-form"
        onSubmit={handleSubmit}
      >
        <div className="add-task-title-cont">
          <label
            htmlFor="title"
            className="add-task-title-cont__title form-label"
          >
            Task Title:
          </label>
          <input
            type="text"
            className="add-task-title-cont__input form-input"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-task-desc-cont">
          <label
            className="add-task-desc-cont__desc form-label"
            htmlFor="description"
          >
            Description:
          </label>
          <textarea
            className="add-task-desc-cont__input form-text-area"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="add-task-priority-cont">
          <label
            className="add-task-priority-cont__priority form-label"
            htmlFor="priority"
          >
            Priority:
          </label>
          <select
            className="add-task-priority-cont__input form-option"
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="add-task-status-cont">
          <label
            className="add-task-status-cont__status form-label"
            htmlFor="status"
          >
            Status:
          </label>
          <select
            className="add-task-status-cont__input form-option"
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="add-task-button-cont">
          <button
            className="add-task-button button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding Task..." : "Add Task"}
          </button>
          <button
            className="add-task-cancel-button button"
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

export default AddTaskForm;
