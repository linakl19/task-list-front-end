import { useState } from 'react';
import PropTypes from 'prop-types';
import TaskDetails from './TaskDetails';
import './Task.css';
import './TaskDetails.css';

const Task = ({ id, title, description, completedAt, isComplete, onTaskDelete, onTaskCompletionToggle}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';
  const completionStatus = isComplete ? `${completedAt}` : 'In Progress';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => setIsPopupOpen(true)}
      >
        {title}
      </button>
      <TaskDetails isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2>Task Details</h2>
        <ul className='task__details--list'>
          <li><span>Title: </span>{title}</li>
          <li><span>Description: </span>{description}</li>
          <li><span>Completed at: </span>{completionStatus}</li>
        </ul>
      </TaskDetails>
      <button
        className="tasks__item__status button"
        onClick={() => onTaskCompletionToggle(id)}
      >
        ✅
      </button>
      <button
        className="tasks__item__remove button"
        onClick={()=> onTaskDelete(id)}
      >
        ❌
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  completedAt: PropTypes.date,
  isComplete: PropTypes.bool.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
  onTaskCompletionToggle: PropTypes.func.isRequired,
};

export default Task;
