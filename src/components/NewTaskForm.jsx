import { useState, useId } from 'react';
import PropTypes from 'prop-types';

const kFormData = {
  title: '',
  description: '',
};

const NewTaskForm = ({ onAddTask }) => {
  const [formData, setFormData] = useState(kFormData);
  const inputId = useId();

  const submitTaskData = (event) => {
    event.preventDefault();
    onAddTask(formData);
    setFormData(kFormData);
  };

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [inputName]: inputValue,
      };
    });
  };

  return (
    <form onSubmit={submitTaskData} className='newTaskForm'>
      <section>
        <h2>Add a New Task</h2>
        <div>
          <label htmlFor={`${inputId}-title`}>Title: </label>
          <input
            onChange={handleChange}
            type="text"
            name="title"
            id={`${inputId}-title`}
            value={formData.title} />
        </div>
        <div>
          <label htmlFor={`${inputId}-description`}>Description: </label>
          <input
            onChange={handleChange}
            type="text"
            name="description"
            id={`${inputId}-description`}
            value={formData.description} />
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
