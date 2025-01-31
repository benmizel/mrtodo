import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.scss";

const TaskList = ({ tasks, fetchTasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="no-task-announcement">
        No tasks available. Start by adding a new one!
      </p>
    );
  }
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </div>
  );
};

export default TaskList;
