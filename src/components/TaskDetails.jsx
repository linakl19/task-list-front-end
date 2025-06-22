import PropTypes from 'prop-types';

const TaskDetails = ({ isOpen, onClose, children }) => {
  if(!isOpen) return null;

  return (
    <div className="tasks__detail__overlay"
      onClick={onClose}>
      <div className="tasks__details" onClick={(event) => event.stopPropagation()}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default TaskDetails;

TaskDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
