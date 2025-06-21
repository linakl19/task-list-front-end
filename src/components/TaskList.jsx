import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onTaskClick, onTaskDelete, onTaskCompletionToggle }) => {
  // const getTaskListJSX = (tasks) => {
  //   return tasks.map((task) => {
  //     return (
  //       <Task
  //         key={task.id}
  //         id={task.id}
  //         title={task.title}
  //         isComplete={task.isComplete}
  //         onTaskToggle={onTaskClick}
  //       />
  //     );
  //   });
  // };
  const taskComponents = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        isComplete={task.isComplete}
        onTaskToggle={onTaskClick}
        onTaskCompletionToggle={onTaskCompletionToggle}
        onTaskDelete={onTaskDelete}
      />
    );
  });

  // return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
  return <ul className="tasks__list no-bullet">{taskComponents}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTaskClick: PropTypes.func.isRequired,
  onTaskCompletionToggle: PropTypes.func.isRequired,
  onTaskDelete: PropTypes.func.isRequired,
};

export default TaskList;
