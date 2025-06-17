import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onTaskToggle, onTaskDelete }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => onTaskToggle(id)}
      >
        {title}
      </button>
      <button
        className="tasks__item__remove button"
        onClick={()=> onTaskDelete(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onTaskToggle: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
};

export default Task;
