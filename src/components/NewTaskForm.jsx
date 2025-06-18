import { useState, useId } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const inputId = useId();

  const submitTaskData = (event) => {
    event.preventDefault();

    const newTask = {
      title,
      description: ''
    };

    onAddTask(newTask);
    setTitle('');
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <form onSubmit={submitTaskData} className='newTaskForm'>
      <section>
        <h2>Add a New Task</h2>
        <div>
          <label htmlFor={`${inputId}-title`}></label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            id={`${inputId}-title`}
            value={title} />
        </div>
        <div>
          <button type="submit">Add Task</button>
        </div>
      </section>
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
