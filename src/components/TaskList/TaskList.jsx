import TaskItem from "../TaskItem/TaskItem";
import "./TaskList.scss";

const TaskList = ({ tasks, fetchTasks }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="no-task-announcement">
        You don't have any tasks yet! Start by adding a new one!
      </p>
    );
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />
      ))}
    </ul>
  );
};

export default TaskList;
