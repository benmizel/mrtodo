import EditTaskForm from "../EditTaskForm/EditTaskForm";
import './EditTask.scss';

const EditTask = () => {
  return (
    <main className="edit-task-page">
      <h1 className="edit-task-page__heading">Edit Task</h1>
      <EditTaskForm />
    </main>
  );
};

export default EditTask;
