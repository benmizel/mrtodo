import AddTaskForm from '../AddTaskForm/AddTaskForm';
import './AddTask.scss';

const AddTask = () => {
    return ( 
        <main className="add-task-page">
            <h1 className="add-task-page__heading">Create a New Task</h1>
        <AddTaskForm />
        </main>
     );
}
 
export default AddTask;